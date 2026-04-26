import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl sm:text-9xl font-black tracking-tighter text-zinc-800">
          404
        </h1>
        <p className="text-xl font-bold text-white mt-4">Lost in the void</p>
        <p className="text-zinc-500 mt-2">
          This page doesn&apos;t exist. Maybe it never did.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            Back Home
          </Link>
          <Link href="/shop" className="btn-ghost">
            Shop Instead
          </Link>
        </div>
      </div>
    </div>
  );
}
