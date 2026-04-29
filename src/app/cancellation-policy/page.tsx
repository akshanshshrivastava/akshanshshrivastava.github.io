import Link from "next/link";

export const metadata = {
  title: "Cancellation Policy — KRAVVY",
  description:
    "How and when you can cancel an order placed on kravvy.com.",
};

const LAST_UPDATED = "April 29, 2026";

export default function CancellationPolicyPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-xs font-mono uppercase tracking-widest text-red-500">
          // Legal
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mt-2">
          CANCELLATION POLICY
        </h1>
        <p className="text-sm text-zinc-500 mt-3">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="mt-10 p-5 border border-red-500/30 bg-red-500/5 rounded-lg text-sm text-red-200 leading-relaxed">
          <strong className="text-red-400">Quick summary:</strong> Orders may
          be cancelled within <strong>2 hours</strong> of being placed.
          Cancellation stops the order from being shipped, but{" "}
          <strong>does not result in a refund</strong>. After the 2-hour
          window, orders cannot be cancelled.
        </div>

        <div className="mt-10 space-y-10 text-zinc-300 leading-relaxed">
          <Section title="1. Cancellation Window">
            <p>
              You may request to cancel an order within{" "}
              <strong>2 hours (120 minutes)</strong> from the time the order
              is successfully placed (timestamp shown in your order
              confirmation email).
            </p>
            <p className="mt-3">
              After this 2-hour window passes, the order is locked for
              processing and <strong>cannot be cancelled</strong>, regardless
              of whether it has physically shipped from our warehouse.
            </p>
          </Section>

          <Section title="2. How to Request a Cancellation">
            <p>
              To cancel an order within the allowed window, email us at{" "}
              <a
                href="mailto:support@kravvy.com"
                className="text-red-400 hover:underline"
              >
                support@kravvy.com
              </a>{" "}
              with:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 mt-2">
              <li>
                The subject line: <em>&quot;Cancel Order&quot;</em>.
              </li>
              <li>Your order number.</li>
              <li>The email address used for the order.</li>
            </ul>
            <p className="mt-3">
              The cancellation is considered effective only after we reply to
              confirm it. Sending an email does not by itself cancel the
              order &mdash; we must receive and process your request within
              the 2-hour window.
            </p>
          </Section>

          <Section title="3. What Happens When You Cancel">
            <ul className="list-disc list-outside ml-5 space-y-2">
              <li>
                The order will be marked as cancelled in our system and{" "}
                <strong>will not be shipped</strong>.
              </li>
              <li>
                <strong>No monetary refund will be issued</strong> for a
                cancelled order. The amount paid is treated as forfeited
                under this Cancellation Policy and our{" "}
                <Link
                  href="/refund-policy"
                  className="text-red-400 hover:underline"
                >
                  Refund Policy
                </Link>
                .
              </li>
              <li>
                You will receive a confirmation email once the cancellation
                has been processed.
              </li>
            </ul>
            <p className="mt-3">
              By placing an order on the Site, you acknowledge and accept
              these consequences of cancelling an order.
            </p>
          </Section>

          <Section title="4. Cancellations After 2 Hours">
            <p>
              Orders cannot be cancelled after the 2-hour window. The order
              will be processed, packed, and shipped as scheduled. If you no
              longer want the product after the cancellation window, please
              refer to our{" "}
              <Link
                href="/refund-policy"
                className="text-red-400 hover:underline"
              >
                Refund Policy
              </Link>{" "}
              for return options.
            </p>
          </Section>

          <Section title="5. Cancellations by KRAVVY">
            <p>
              We reserve the right to cancel any order at our sole
              discretion, including (but not limited to) cases of suspected
              fraud, payment authorisation issues, inventory errors, pricing
              errors, undeliverable shipping addresses, or violation of our{" "}
              <Link
                href="/terms"
                className="text-red-400 hover:underline"
              >
                Terms &amp; Conditions
              </Link>
              .
            </p>
            <p className="mt-3">
              If we cancel your order for any of the reasons above and it
              was no fault of yours, we will issue a full refund of the
              amount paid to your original payment method via Razorpay
              within 7&ndash;10 business days.
            </p>
          </Section>

          <Section title="6. Contact Us">
            <p>
              For any questions about this Cancellation Policy or your
              specific order, please reach out to us at{" "}
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
            href="/refund-policy"
            className="text-zinc-400 hover:text-red-400 transition-colors"
          >
            → Refund Policy
          </Link>
          <Link
            href="/terms"
            className="text-zinc-400 hover:text-red-400 transition-colors"
          >
            → Terms &amp; Conditions
          </Link>
          <Link
            href="/privacy"
            className="text-zinc-400 hover:text-red-400 transition-colors"
          >
            → Privacy Policy
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
