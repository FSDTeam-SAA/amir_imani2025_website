const CALLBACK_URL_BASE = "https://doundo.local";

export function createLoginUrl(returnTo: string) {
  return `/login?callbackUrl=${encodeURIComponent(returnTo)}`;
}

export function getSafeCallbackUrl(callbackUrl: string | null) {
  if (!callbackUrl) {
    return "/";
  }

  const url = new URL(callbackUrl, CALLBACK_URL_BASE);

  if (
    url.origin !== CALLBACK_URL_BASE ||
    url.pathname === "/login" ||
    url.pathname.startsWith("/login/")
  ) {
    return "/";
  }

  return `${url.pathname}${url.search}${url.hash}`;
}
