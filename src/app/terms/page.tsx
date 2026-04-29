import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions — KRAVVY",
  description:
    "The terms and conditions that govern your use of kravvy.com and any purchases you make from us.",
};

const LAST_UPDATED = "April 29, 2026";

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-xs font-mono uppercase tracking-widest text-red-500">
          // Legal
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mt-2">
          TERMS &amp; CONDITIONS
        </h1>
        <p className="text-sm text-zinc-500 mt-3">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="mt-12 space-y-10 text-zinc-300 leading-relaxed">
          <Section title="1. Who We Are">
            <p>
              These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your
              access to and use of <strong>kravvy.com</strong> (the
              &ldquo;Site&rdquo;) and the products and services offered by
              KRAVVY (&ldquo;KRAVVY&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
              or &ldquo;our&rdquo;). By visiting the Site, placing an order, or
              otherwise interacting with us, you agree to be bound by these
              Terms. If you do not agree, please do not use the Site.
            </p>
          </Section>

          <Section title="2. Eligibility">
            <p>
              You must be at least 18 years old, or accessing the Site under
              the supervision of a parent or legal guardian, to make a purchase
              or create an account. By placing an order, you represent that the
              information you provide is accurate and that you are legally
              capable of entering into a binding contract.
            </p>
          </Section>

          <Section title="3. Products, Pricing &amp; Availability">
            <ul className="list-disc list-outside ml-5 space-y-2">
              <li>
                All product descriptions, images, colours and prices on the
                Site are provided for reference. Slight variations in colour,
                fabric, and finish may occur due to your screen settings or the
                handcrafted nature of certain pieces.
              </li>
              <li>
                Prices are listed in Indian Rupees (INR / ₹) and are inclusive
                of applicable taxes unless stated otherwise. Shipping fees, if
                any, are calculated at checkout.
              </li>
              <li>
                We reserve the right to change prices, modify or discontinue
                any product at any time without notice. We are not liable to
                you or any third party for any such changes.
              </li>
              <li>
                In the rare event of a pricing or stock error, we reserve the
                right to cancel any order placed for the product, even after
                the order has been confirmed and a charge processed. In that
                case we will issue a full refund.
              </li>
            </ul>
          </Section>

          <Section title="4. Orders &amp; Payment">
            <ul className="list-disc list-outside ml-5 space-y-2">
              <li>
                When you place an order, you make an offer to purchase the
                product(s) at the listed price. The contract is formed when we
                send you an order confirmation email.
              </li>
              <li>
                Payments are processed securely through{" "}
                <strong>Razorpay</strong>. We do not store your card or banking
                details on our servers. By paying through Razorpay you also
                agree to their terms of service.
              </li>
              <li>
                We reserve the right to refuse or cancel any order for reasons
                including (but not limited to) suspected fraud, payment
                authorisation failure, inventory errors, or violation of these
                Terms.
              </li>
            </ul>
          </Section>

          <Section title="5. Shipping &amp; Delivery">
            <p>
              We currently ship within India. Estimated delivery times shown at
              checkout are indicative and may vary based on courier partner,
              location, public holidays, weather, or events outside our
              control. Risk of loss and title for items purchased pass to you
              upon delivery to the courier.
            </p>
          </Section>

          <Section title="6. Cancellations, Returns &amp; Refunds">
            <p>
              <strong>All sales are final.</strong> KRAVVY does not offer
              monetary refunds once an order has been paid for. Specific
              rules apply for cancellations and returns:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-2 mt-3">
              <li>
                Orders may be cancelled within <strong>2 hours</strong> of
                being placed. After this window, orders cannot be cancelled.
                Cancellation stops the order from shipping but does not
                result in a refund. See our{" "}
                <Link
                  href="/cancellation-policy"
                  className="text-red-400 hover:underline"
                >
                  Cancellation Policy
                </Link>{" "}
                for full details.
              </li>
              <li>
                Returns are accepted only at the customer&rsquo;s expense and
                do not entitle the customer to a refund. They may, at
                KRAVVY&rsquo;s sole discretion, be eligible for a size
                exchange or store credit. See our{" "}
                <Link
                  href="/refund-policy"
                  className="text-red-400 hover:underline"
                >
                  Refund Policy
                </Link>{" "}
                for the full process and conditions.
              </li>
              <li>
                If you receive a damaged, defective, or incorrect product,
                contact us at{" "}
                <a
                  href="mailto:support@kravvy.com"
                  className="text-red-400 hover:underline"
                >
                  support@kravvy.com
                </a>{" "}
                within 48 hours of delivery with photographs. We will arrange
                a replacement at our cost.
              </li>
            </ul>
          </Section>

          <Section title="7. Intellectual Property">
            <p>
              The KRAVVY name, logo, website design, graphics, photographs,
              product designs, and all other content on the Site are owned by
              or licensed to KRAVVY and are protected by Indian and
              international copyright and trademark law. You may not copy,
              reproduce, distribute, or create derivative works from any part
              of the Site without our prior written consent.
            </p>
          </Section>

          <Section title="8. Acceptable Use">
            <p>You agree not to:</p>
            <ul className="list-disc list-outside ml-5 space-y-2 mt-2">
              <li>
                Use the Site for any unlawful purpose or in violation of these
                Terms.
              </li>
              <li>
                Attempt to gain unauthorised access to any portion of the Site,
                its servers, or related infrastructure.
              </li>
              <li>
                Use bots, scrapers, or any automated means to access or copy
                content from the Site.
              </li>
              <li>
                Transmit viruses, malware, or any other harmful or disruptive
                code.
              </li>
              <li>
                Resell our products without our written authorisation.
              </li>
            </ul>
          </Section>

          <Section title="9. Third-Party Services">
            <p>
              The Site relies on third-party services such as Shopify (for
              catalogue and order management), Razorpay (for payments), and our
              hosting and analytics providers. Their availability or downtime
              may temporarily affect the Site, and we are not responsible for
              outages or actions taken by these third parties.
            </p>
          </Section>

          <Section title="10. Disclaimer &amp; Limitation of Liability">
            <p>
              The Site and our products are provided on an &ldquo;as is&rdquo;
              and &ldquo;as available&rdquo; basis. To the maximum extent
              permitted by applicable law, KRAVVY disclaims all warranties,
              express or implied, including merchantability and fitness for a
              particular purpose. In no event shall KRAVVY, its founders, or
              employees be liable for any indirect, incidental, special,
              consequential, or punitive damages arising out of your use of the
              Site or any product purchased.
            </p>
          </Section>

          <Section title="11. Indemnity">
            <p>
              You agree to indemnify and hold KRAVVY harmless from any claim,
              demand, loss, or expense (including reasonable legal fees)
              arising out of your breach of these Terms or your misuse of the
              Site.
            </p>
          </Section>

          <Section title="12. Governing Law &amp; Jurisdiction">
            <p>
              These Terms are governed by the laws of India. Any dispute
              arising in relation to these Terms or your use of the Site shall
              be subject to the exclusive jurisdiction of the competent courts
              located in <strong>India</strong>.
            </p>
          </Section>

          <Section title="13. Changes to These Terms">
            <p>
              We may update these Terms from time to time. The updated version
              will be posted on this page with a new &ldquo;Last updated&rdquo;
              date. Continued use of the Site after changes are posted
              constitutes acceptance of those changes.
            </p>
          </Section>

          <Section title="14. Contact Us">
            <p>
              For any questions about these Terms, please reach out at{" "}
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
            href="/privacy"
            className="text-zinc-400 hover:text-red-400 transition-colors"
          >
            → Privacy Policy
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
