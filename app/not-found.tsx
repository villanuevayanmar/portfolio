import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand">
        404
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-slate-600 dark:text-slate-400">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Back to home
      </Link>
    </div>
  );
}
