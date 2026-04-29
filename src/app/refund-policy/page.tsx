import Link from "next/link";

export const metadata = {
  title: "Refund Policy — KRAVVY",
  description:
    "All sales on kravvy.com are final. Read our refund and return policy in full.",
};

const LAST_UPDATED = "April 29, 2026";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-xs font-mono uppercase tracking-widest text-red-500">
          // Legal
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mt-2">
          REFUND POLICY
        </h1>
        <p className="text-sm text-zinc-500 mt-3">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="mt-10 p-5 border border-red-500/30 bg-red-500/5 rounded-lg text-sm text-red-200 leading-relaxed">
          <strong className="text-red-400">All sales are final.</strong>{" "}
          Once you place and pay for an order on kravvy.com, no monetary
          refund will be issued. Please review your order carefully before
          completing payment.
        </div>

        <div className="mt-10 space-y-10 text-zinc-300 leading-relaxed">
          <Section title="1. No Refunds">
            <p>
              KRAVVY operates on a strict <strong>no-refund</strong> basis.
              Once payment is successfully captured for an order, the amount
              paid is non-refundable. This includes (but is not limited to)
              change of mind, incorrect size selection, ordering by mistake,
              dissatisfaction with fit, or any other personal reason.
            </p>
            <p className="mt-3">
              By completing a purchase on the Site, you confirm that you have
              read and accepted this no-refund policy.
            </p>
          </Section>

          <Section title="2. Returning a Product">
            <p>
              You are welcome to return a delivered product to us, but please
              note the following:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 mt-2">
              <li>
                <strong>Return shipping is at your own expense.</strong> KRAVVY
                does not arrange or pay for return pickups.
              </li>
              <li>
                The product must be unworn, unwashed, with all original tags
                and packaging intact, and must reach us in saleable condition.
              </li>
              <li>
                Returns received in damaged or used condition will not be
                accepted and the product will be returned to you (again at
                your expense).
              </li>
              <li>
                Even after a successful return, no monetary refund will be
                issued. Returns may, at our sole discretion, be eligible for
                a size exchange or store credit on a case-by-case basis.
              </li>
            </ul>
          </Section>

          <Section title="3. Damaged, Defective, or Incorrect Items">
            <p>
              If you receive a product that is damaged, defective, or
              materially different from what you ordered, contact us within{" "}
              <strong>48 hours</strong> of delivery at{" "}
              <a
                href="mailto:support@kravvy.com"
                className="text-red-400 hover:underline"
              >
                support@kravvy.com
              </a>{" "}
              with:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 mt-2">
              <li>Your order number.</li>
              <li>
                Clear photographs of the product, the issue, the shipping
                label, and the unopened/just-opened package.
              </li>
              <li>A short description of the problem.</li>
            </ul>
            <p className="mt-3">
              If our team confirms the issue is on our end, we will arrange a
              replacement of the same or equivalent item at no additional
              cost to you. This is the only scenario in which KRAVVY bears
              the return shipping cost.
            </p>
          </Section>

          <Section title="4. Order Cancellations">
            <p>
              For information about cancelling an order before it ships,
              please review our{" "}
              <Link
                href="/cancellation-policy"
                className="text-red-400 hover:underline"
              >
                Cancellation Policy
              </Link>
              .
            </p>
          </Section>

          <Section title="5. Failed Payments &amp; Duplicate Charges">
            <p>
              If your payment fails but the amount has been debited from
              your account, the bank or Razorpay typically reverses the
              charge automatically within 5&ndash;7 business days. No order
              will be created in that case. If you do not see the reversal
              within that time, please contact us at{" "}
              <a
                href="mailto:support@kravvy.com"
                className="text-red-400 hover:underline"
              >
                support@kravvy.com
              </a>{" "}
              with your transaction ID and we will assist with the
              investigation.
            </p>
          </Section>

          <Section title="6. Contact Us">
            <p>
              For any questions about this Refund Policy, please reach out
              at{" "}
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
            href="/cancellation-policy"
            className="text-zinc-400 hover:text-red-400 transition-colors"
          >
            → Cancellation Policy
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
