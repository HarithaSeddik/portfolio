import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm text-amber tracking-wide">404</p>
      <h1 className="mt-4 font-heading text-4xl font-bold text-ink md:text-5xl">
        wrong turn
      </h1>
      <p className="mt-4 max-w-sm text-muted">
        this page doesn&apos;t exist. might&apos;ve been moved, deleted, or
        never existed in the first place.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-80"
      >
        back home
      </Link>
    </div>
  );
}
