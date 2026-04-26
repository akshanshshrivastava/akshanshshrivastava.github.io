import Link from "next/link";

export const metadata = {
  title: "Thank You — KRAVVY",
  description: "Your order has been placed.",
};

interface PageProps {
  searchParams: Promise<{ payment_id?: string }>;
}

export default async function ThankYouPage({ searchParams }: PageProps) {
  const { payment_id } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24 bg-black text-white">
      <div className="max-w-xl w-full text-center gradient-border p-10 sm:p-14">
        <div className="text-5xl mb-6">🕷️</div>
        <span className="text-xs font-mono uppercase tracking-widest text-red-500">
          // Payment Received
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-3">
          THANK YOU
        </h1>
        <p className="text-zinc-400 mt-4 leading-relaxed">
          Your payment was successful and your order is being processed. You&rsquo;ll
          receive a confirmation email shortly.
        </p>

        {payment_id && (
          <p className="mt-6 text-xs font-mono text-zinc-500 break-all">
            Payment ID: <span className="text-zinc-300">{payment_id}</span>
          </p>
        )}

        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link href="/shop" className="btn-primary">
            Keep Shopping
          </Link>
          <Link href="/" className="btn-ghost">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
