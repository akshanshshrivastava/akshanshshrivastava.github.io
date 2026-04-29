import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — KRAVVY",
  description:
    "How KRAVVY collects, uses and protects your personal information when you use kravvy.com.",
};

const LAST_UPDATED = "April 29, 2026";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-xs font-mono uppercase tracking-widest text-red-500">
          // Legal
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mt-2">
          PRIVACY POLICY
        </h1>
        <p className="text-sm text-zinc-500 mt-3">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="mt-12 space-y-10 text-zinc-300 leading-relaxed">
          <Section title="1. Introduction">
            <p>
              KRAVVY (&ldquo;KRAVVY&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
              or &ldquo;our&rdquo;) respects your privacy. This Privacy Policy
              explains what personal information we collect when you visit{" "}
              <strong>kravvy.com</strong> (the &ldquo;Site&rdquo;), how we use
              it, who we share it with, and the choices you have. By using the
              Site you consent to the practices described below.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We collect the following categories of information:</p>
            <ul className="list-disc list-outside ml-5 space-y-2 mt-2">
              <li>
                <strong>Information you give us</strong> &mdash; name, email
                address, shipping address, billing address, phone number, and
                any messages you send via our contact form.
              </li>
              <li>
                <strong>Order &amp; payment information</strong> &mdash; items
                purchased, order amount, transaction status. Card and banking
                details are collected and processed directly by Razorpay; we
                never see or store them on our servers.
              </li>
              <li>
                <strong>Device &amp; usage data</strong> &mdash; IP address,
                browser type and version, operating system, referring URLs,
                pages visited, and timestamps. This data is collected
                automatically by our hosting provider (Vercel) and Vercel
                Analytics.
              </li>
              <li>
                <strong>Cookies &amp; similar technologies</strong> &mdash;
                small data files stored on your device to keep your cart,
                remember preferences, and measure traffic. See section 6.
              </li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <ul className="list-disc list-outside ml-5 space-y-2">
              <li>To process and fulfil your orders, including shipping.</li>
              <li>
                To communicate with you about your order, respond to your
                queries, and provide customer support.
              </li>
              <li>
                To send service-related emails (order confirmations, shipping
                updates, refund notifications).
              </li>
              <li>
                With your explicit consent, to send marketing emails about new
                drops, promotions, and brand news. You can unsubscribe at any
                time.
              </li>
              <li>
                To detect, prevent, and address fraud, security, or technical
                issues.
              </li>
              <li>
                To analyse Site performance and improve product and user
                experience.
              </li>
              <li>To comply with our legal and tax obligations.</li>
            </ul>
          </Section>

          <Section title="4. Who We Share Your Information With">
            <p>
              We do not sell your personal information. We share it only with
              the following categories of third parties, and only to the extent
              required to operate our business:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 mt-2">
              <li>
                <strong>Shopify</strong> &mdash; for product catalogue, order
                management, and inventory.
              </li>
              <li>
                <strong>Razorpay</strong> &mdash; for payment processing.
                Razorpay handles your card and banking information directly
                under their own privacy policy.
              </li>
              <li>
                <strong>Shipping &amp; logistics partners</strong> &mdash; to
                deliver your order to the address you provide.
              </li>
              <li>
                <strong>Email service providers</strong> &mdash; to send
                transactional and (with your consent) marketing emails.
              </li>
              <li>
                <strong>Hosting &amp; analytics providers</strong> (Vercel,
                Vercel Analytics) &mdash; to host the Site and understand
                traffic patterns. Analytics data is aggregated and does not
                identify individual users.
              </li>
              <li>
                <strong>Government authorities</strong> &mdash; when required
                by Indian law, court order, or to protect our legal rights.
              </li>
            </ul>
          </Section>

          <Section title="5. Data Retention">
            <p>
              We retain your personal information for as long as needed to
              provide the services you requested, comply with our legal and
              accounting obligations (typically up to 8 years for transaction
              records under Indian tax law), resolve disputes, and enforce our
              agreements. After that, we delete or anonymise the data.
            </p>
          </Section>

          <Section title="6. Cookies &amp; Tracking">
            <p>We use the following types of cookies and storage:</p>
            <ul className="list-disc list-outside ml-5 space-y-2 mt-2">
              <li>
                <strong>Essential</strong> &mdash; for cart functionality
                (stored in your browser&rsquo;s local storage), authentication,
                and basic Site operation.
              </li>
              <li>
                <strong>Analytics</strong> &mdash; via Vercel Analytics, which
                collects aggregated, non-identifying page-view data.
              </li>
              <li>
                <strong>Payment</strong> &mdash; cookies set by Razorpay during
                checkout to securely process your payment.
              </li>
            </ul>
            <p className="mt-3">
              You can control cookies through your browser settings. Disabling
              essential cookies may break parts of the Site (cart, checkout).
            </p>
          </Section>

          <Section title="7. Data Security">
            <p>
              We use reasonable technical and organisational measures to
              protect your information, including HTTPS encryption in transit
              and access controls on our servers. Payment processing happens on
              Razorpay&rsquo;s PCI-DSS-compliant systems. However, no system is
              perfectly secure &mdash; we cannot guarantee absolute security
              and you transmit information at your own risk.
            </p>
          </Section>

          <Section title="8. Your Rights">
            <p>
              Depending on the laws applicable to you (including India&rsquo;s
              Digital Personal Data Protection Act, 2023), you may have the
              right to:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 mt-2">
              <li>Access the personal information we hold about you.</li>
              <li>Request correction of inaccurate or incomplete data.</li>
              <li>
                Request deletion of your personal information, subject to our
                legal record-keeping obligations.
              </li>
              <li>Withdraw consent for marketing communications at any time.</li>
              <li>Lodge a complaint with the relevant data protection authority.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email us at{" "}
              <a
                href="mailto:support@kravvy.com"
                className="text-red-400 hover:underline"
              >
                support@kravvy.com
              </a>
              . We will respond within a reasonable timeframe and may need to
              verify your identity before acting on your request.
            </p>
          </Section>

          <Section title="9. Children's Privacy">
            <p>
              The Site is not intended for use by individuals under the age of
              18. We do not knowingly collect personal information from
              minors. If we learn that we have collected such information, we
              will delete it promptly.
            </p>
          </Section>

          <Section title="10. International Data Transfers">
            <p>
              Some of the third-party services we use (e.g. Vercel) may
              process data on servers located outside India. By using the
              Site, you consent to such transfers. We work with reputable
              providers and rely on their data-protection commitments.
            </p>
          </Section>

          <Section title="11. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. The updated
              version will be posted on this page with a new &ldquo;Last
              updated&rdquo; date. For material changes we will make
              reasonable efforts to notify you (for example, by email or a
              Site banner).
            </p>
          </Section>

          <Section title="12. Contact Us">
            <p>
              If you have questions, comments, or complaints about this
              Privacy Policy or our data practices, please contact us at{" "}
              <a
                href="mailto:support@kravvy.com"
                className="text-red-400 hover:underline"
              >
                support@kravvy.com
              </a>
              .
            </p>
          </Section>
        </div>

        <div className="mt-16 pt-10 border-t border-zinc-800/50 flex flex-wrap gap-4 text-sm">
          <Link
            href="/terms"
            className="text-zinc-400 hover:text-red-400 transition-colors"
          >
            → Terms &amp; Conditions
          </Link>
          <Link
            href="/contact"
            className="text-zinc-400 hover:text-red-400 transition-colors"
          >
            → Contact Us
          </Link>
          <Link
            href="/"
            className="text-zinc-400 hover:text-red-400 transition-colors"
          >
            → Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-3">
        {title}
      </h2>
      <div className="text-zinc-400 text-[15px] leading-relaxed">
        {children}
      </div>
    </section>
  );
}
