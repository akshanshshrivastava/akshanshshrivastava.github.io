/* =============================================================
   KRAVVY · interactions
   - custom cursor + glow trail
   - countdown timer
   - parallax on hero content
   - 3D tilt on shirt cards
   - color swatches + randomize graphic generator
   - ripple + glitch button effects
   - contact form -> mailto
   ============================================================= */

(() => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* -----------------------------------------------------------
     1. Custom cursor + glow trail
     ----------------------------------------------------------- */
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorGlow = document.querySelector(".cursor-glow");
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;

  const isCoarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  if (!isCoarse && cursorDot && cursorGlow) {
    window.addEventListener(
      "pointermove",
      (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      },
      { passive: true }
    );

    const trail = () => {
      glowX += (mouseX - glowX) * 0.15;
      glowY += (mouseY - glowY) * 0.15;
      cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
      requestAnimationFrame(trail);
    };
    if (!reduceMotion) trail();

    document
      .querySelectorAll("a, button, input, textarea, select, [data-tilt], .swatch")
      .forEach((el) => {
        el.addEventListener("mouseenter", () =>
          document.body.classList.add("is-hovering-cta")
        );
        el.addEventListener("mouseleave", () =>
          document.body.classList.remove("is-hovering-cta")
        );
      });
  }

  /* -----------------------------------------------------------
     2. Countdown timer (target: 60 days from first load, persisted)
     ----------------------------------------------------------- */
  const STORAGE_KEY = "kravvy_launch_target";
  let target = Number(localStorage.getItem(STORAGE_KEY));
  if (!target || Number.isNaN(target) || target < Date.now()) {
    target = Date.now() + 60 * 24 * 60 * 60 * 1000;
    try {
      localStorage.setItem(STORAGE_KEY, String(target));
    } catch (_) {
      /* ignore */
    }
  }

  const days = document.getElementById("cd-days");
  const hours = document.getElementById("cd-hours");
  const minutes = document.getElementById("cd-minutes");
  const seconds = document.getElementById("cd-seconds");

  const pad = (n, len = 2) => String(Math.max(0, n)).padStart(len, "0");

  const tick = () => {
    const diff = Math.max(0, target - Date.now());
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    if (days) days.textContent = pad(d, 3);
    if (hours) hours.textContent = pad(h);
    if (minutes) minutes.textContent = pad(m);
    if (seconds) seconds.textContent = pad(s);
  };
  tick();
  setInterval(tick, 1000);

  /* -----------------------------------------------------------
     3. Parallax on hero content following cursor
     ----------------------------------------------------------- */
  const parallaxRoots = document.querySelectorAll("[data-parallax-root]");
  const parallaxItems = document.querySelectorAll("[data-parallax]");

  if (!reduceMotion) {
    let px = 0,
      py = 0;
    let tx = 0,
      ty = 0;
    window.addEventListener(
      "pointermove",
      (e) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        tx = (e.clientX - cx) / cx;
        ty = (e.clientY - cy) / cy;
      },
      { passive: true }
    );

    const loop = () => {
      px += (tx - px) * 0.06;
      py += (ty - py) * 0.06;

      parallaxItems.forEach((el) => {
        const depth = Number(el.dataset.parallax || 0.02);
        const x = px * depth * 100;
        const y = py * depth * 100;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });

      // Subtle bg shift on hero — keep scale at 1 so background-size:contain
      // stays accurate and the banner art is fully visible.
      const heroBg = document.querySelector(".hero__bg");
      if (heroBg) {
        heroBg.style.transform = `translate3d(${px * -8}px, ${py * -8}px, 0)`;
      }

      requestAnimationFrame(loop);
    };
    loop();
  }

  /* -----------------------------------------------------------
     4. 3D tilt on shirt cards
     ----------------------------------------------------------- */
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    const tee = card.querySelector(".tee");
    let rect = null;
    let raf = null;

    const onEnter = () => {
      rect = card.getBoundingClientRect();
    };

    const onMove = (e) => {
      if (!rect) rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotY = x * 14;
      const rotX = -y * 12;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`;
        if (tee) {
          tee.style.transform = `translateZ(40px) rotateX(${rotX * 0.3}deg) rotateY(${rotY * 0.3}deg) scale(1.02)`;
        }
      });
    };

    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      card.style.transform = "";
      if (tee) tee.style.transform = "";
      rect = null;
    };

    if (!reduceMotion) {
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
    }
  });

  /* -----------------------------------------------------------
     5. Color swatches
     ----------------------------------------------------------- */
  const swatches = document.querySelectorAll(".swatch");
  const teeBodies = document.querySelectorAll(".tee__body");
  const colorwayName = document.getElementById("colorway-name");

  const setShirtColor = (color, name) => {
    teeBodies.forEach((path) => {
      path.style.transition = "fill 0.35s ease";
      path.setAttribute("fill", color);
      path.style.fill = color;
    });
    if (colorwayName) colorwayName.textContent = name;
  };

  swatches.forEach((btn) => {
    btn.addEventListener("click", () => {
      swatches.forEach((s) => {
        s.classList.remove("is-active");
        s.setAttribute("aria-checked", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-checked", "true");
      setShirtColor(btn.dataset.color, btn.dataset.name);
    });
  });

  /* -----------------------------------------------------------
     6. Randomize graphic generator
     ----------------------------------------------------------- */
  const SVG_NS = "http://www.w3.org/2000/svg";
  const printGroups = document.querySelectorAll(".tee__print");
  const graphicName = document.getElementById("graphic-name");
  const randomizeBtn = document.getElementById("randomize");

  const PALETTES = [
    ["#c8ff00", "#ffffff", "#0a0a0a"],
    ["#ff3b8a", "#c8ff00", "#0a0a0a"],
    ["#00e0ff", "#ffffff", "#7b3fe4"],
    ["#ffffff", "#c8ff00", "#ff3b3b"],
    ["#ff8a3b", "#c8ff00", "#ffffff"],
  ];

  const JP_WORDS = [
    "自分次第",
    "限定",
    "力",
    "夜",
    "未来",
    "刃",
    "覚醒",
    "壱",
    "黒",
    "風",
  ];

  const TAGLINES = [
    "OWN YOUR VIBE",
    "BUILT DIFFERENT",
    "DROP/01",
    "KRAVVY · TKY",
    "NIGHT MODE",
    "SECTION_K",
    "WORN BY YOU",
  ];

  const SHAPES = ["circle", "square", "triangle", "rings", "cross"];

  const rand = (a, b) => a + Math.random() * (b - a);
  const randInt = (a, b) => Math.floor(rand(a, b + 1));
  const pick = (arr) => arr[randInt(0, arr.length - 1)];

  const buildGraphic = (target) => {
    while (target.firstChild) target.removeChild(target.firstChild);

    const isMens = target.dataset.print === "mens";
    const cx = 200;
    const cy = isMens ? 270 : 260;

    const palette = pick(PALETTES);
    const accent = palette[0];
    const ink = palette[1];
    const shadow = palette[2];

    // 1. Base shape backdrop
    const shape = pick(SHAPES);
    const size = randInt(90, 130);

    const makeEl = (tag, attrs) => {
      const el = document.createElementNS(SVG_NS, tag);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      return el;
    };

    if (shape === "circle") {
      target.appendChild(
        makeEl("circle", {
          cx,
          cy: cy - 10,
          r: size / 2,
          fill: "none",
          stroke: accent,
          "stroke-width": 2,
          opacity: 0.85,
        })
      );
      target.appendChild(
        makeEl("circle", {
          cx,
          cy: cy - 10,
          r: size / 2 - 8,
          fill: accent,
          opacity: 0.18,
        })
      );
    } else if (shape === "square") {
      target.appendChild(
        makeEl("rect", {
          x: cx - size / 2,
          y: cy - size / 2 - 10,
          width: size,
          height: size,
          fill: "none",
          stroke: accent,
          "stroke-width": 2,
          opacity: 0.9,
        })
      );
      target.appendChild(
        makeEl("rect", {
          x: cx - size / 2 + 6,
          y: cy - size / 2 - 4,
          width: size - 12,
          height: size - 12,
          fill: accent,
          opacity: 0.15,
        })
      );
    } else if (shape === "triangle") {
      const h = (size * Math.sqrt(3)) / 2;
      const points = `${cx},${cy - 20 - h / 2} ${cx - size / 2},${cy - 20 + h / 2} ${cx + size / 2},${cy - 20 + h / 2}`;
      target.appendChild(
        makeEl("polygon", {
          points,
          fill: "none",
          stroke: accent,
          "stroke-width": 2,
          opacity: 0.9,
        })
      );
    } else if (shape === "rings") {
      for (let i = 0; i < 3; i++) {
        target.appendChild(
          makeEl("circle", {
            cx,
            cy: cy - 10,
            r: 30 + i * 20,
            fill: "none",
            stroke: accent,
            "stroke-width": 1.5,
            opacity: 0.7 - i * 0.18,
          })
        );
      }
    } else if (shape === "cross") {
      target.appendChild(
        makeEl("path", {
          d: `M${cx} ${cy - 60} V${cy + 40} M${cx - 50} ${cy - 10} H${cx + 50}`,
          stroke: accent,
          "stroke-width": 4,
          opacity: 0.8,
          "stroke-linecap": "round",
        })
      );
    }

    // 2. JP character
    const jp = makeEl("text", {
      x: cx,
      y: cy + 6,
      "text-anchor": "middle",
      "font-family": "Noto Sans JP, sans-serif",
      "font-weight": 700,
      "font-size": 44,
      fill: ink,
      opacity: 0.95,
    });
    jp.textContent = pick(JP_WORDS);
    target.appendChild(jp);

    // 3. KRAVVY wordmark
    const word = makeEl("text", {
      x: cx,
      y: cy + 40,
      "text-anchor": "middle",
      "font-family": "Bebas Neue, sans-serif",
      "font-size": 22,
      "letter-spacing": 6,
      fill: ink,
    });
    word.textContent = "KRAVVY";
    target.appendChild(word);

    // 4. Catalog code line
    const code = makeEl("text", {
      x: cx,
      y: cy + 58,
      "text-anchor": "middle",
      "font-family": "Share Tech Mono, monospace",
      "font-size": 8,
      "letter-spacing": 3,
      fill: shadow === "#0a0a0a" ? ink : shadow,
      opacity: 0.75,
    });
    const variant = randInt(1, 99).toString().padStart(2, "0");
    const seed = randInt(1000, 9999);
    code.textContent = `KRV/${variant} · SN ${seed} · ${pick(TAGLINES)}`;
    target.appendChild(code);

    // 5. Decorative ticks
    const ticksY = cy - 60;
    for (let i = -2; i <= 2; i++) {
      target.appendChild(
        makeEl("rect", {
          x: cx + i * 12 - 1,
          y: ticksY,
          width: 2,
          height: i === 0 ? 8 : 5,
          fill: accent,
          opacity: 0.85,
        })
      );
    }

    return { variant, seed };
  };

  const randomize = () => {
    let last = null;
    printGroups.forEach((g) => {
      g.style.opacity = "0";
      setTimeout(() => {
        last = buildGraphic(g);
        g.style.opacity = "1";
      }, 120);
    });
    setTimeout(() => {
      if (graphicName && last) {
        graphicName.textContent = `KRV-${last.variant}/${String(last.seed).slice(-2)}`;
      }
    }, 130);
  };

  // Initial graphics
  printGroups.forEach((g) => buildGraphic(g));

  if (randomizeBtn) {
    randomizeBtn.addEventListener("click", (e) => {
      const rect = randomizeBtn.getBoundingClientRect();
      randomizeBtn.style.setProperty("--rx", `${e.clientX - rect.left}px`);
      randomizeBtn.style.setProperty("--ry", `${e.clientY - rect.top}px`);
      randomizeBtn.classList.remove("is-rippling");
      // force reflow then add to restart animation
      void randomizeBtn.offsetWidth;
      randomizeBtn.classList.add("is-rippling");
      setTimeout(() => randomizeBtn.classList.remove("is-rippling"), 700);
      randomize();
    });
  }

  /* -----------------------------------------------------------
     7. Generic ripple on .btn buttons
     ----------------------------------------------------------- */
  document.querySelectorAll(".btn").forEach((btn) => {
    if (btn.id === "randomize") return; // already handled
    btn.addEventListener("click", (e) => {
      const rect = btn.getBoundingClientRect();
      btn.style.setProperty("--rx", `${e.clientX - rect.left}px`);
      btn.style.setProperty("--ry", `${e.clientY - rect.top}px`);
      btn.classList.remove("is-rippling");
      void btn.offsetWidth;
      btn.classList.add("is-rippling");
      setTimeout(() => btn.classList.remove("is-rippling"), 700);
    });
  });

  /* -----------------------------------------------------------
     8. Contact form -> mailto
     ----------------------------------------------------------- */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-status");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const topic = form.topic.value;
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        if (status) {
          status.textContent = "FILL EVERY FIELD — DON'T BE SHY.";
          status.className = "contact__status is-error";
        }
        return;
      }

      const subject = `[KRAVVY] ${topic} — ${name}`;
      const body = `Name: ${name}\nEmail: ${email}\nReason: ${topic}\n\n${message}\n\n— Sent via kravvy.com`;

      // Gmail compose in a new tab — works without a registered mail handler.
      const gmailUrl =
        "https://mail.google.com/mail/?view=cm&fs=1" +
        "&to=" + encodeURIComponent("support@kravvy.com") +
        "&su=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      const win = window.open(gmailUrl, "_blank", "noopener,noreferrer");

      if (win) {
        if (status) {
          status.textContent = "OPENING GMAIL…";
          status.className = "contact__status is-success";
        }
      } else {
        // Popup blocked — fall back to a same-tab navigation user can confirm.
        if (status) {
          status.textContent = "POPUP BLOCKED — REDIRECTING…";
          status.className = "contact__status is-success";
        }
        window.location.href = gmailUrl;
      }
    });
  }

  /* -----------------------------------------------------------
     9. Reveal on scroll
     ----------------------------------------------------------- */
  const reveals = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach((el) => io.observe(el));
  }
})();
