import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-secondary px-4">
      <div className="text-center max-w-md">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">
          LP
        </div>
        <h1 className="text-4xl font-extrabold text-text-primary mb-3">
          Page Not Found
        </h1>
        <p className="text-text-secondary mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="btn-primary">
            Go to Homepage
          </Link>
          <Link href="/static" className="btn-secondary">
            View Brochure
          </Link>
        </div>
      </div>
    </div>
  );
}
