import Link from "next/link";

const errorMessages: Record<string, string> = {
  CredentialsSignin: "Invalid email or password. Please try again.",
  AccessDenied: "Access denied. Please contact support if this continues.",
  Verification: "Your session could not be verified. Please sign in again.",
  Configuration:
    "Authentication is temporarily unavailable. Please try again shortly.",
  Default: "We could not sign you in right now. Please try again.",
};

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const params = (await searchParams) || {};
  const rawError = params.error || "Default";
  const normalizedError =
    rawError === "undefined" || rawError.trim() === "" ? "Default" : rawError;

  const message = errorMessages[normalizedError] || errorMessages.Default;

  return (
    <section className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Authentication Error
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-[#0E1D2B]">
          Sign in could not be completed
        </h1>
        <p className="mt-4 text-sm leading-6 text-gray-600">{message}</p>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/login"
            className="rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Back to Login
          </Link>
          <Link
            href="/"
            className="rounded-2xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Return Home
          </Link>
        </div>
      </div>
    </section>
  );
}
