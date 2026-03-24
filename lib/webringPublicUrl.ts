/**
 * Canonical public origin for embed HTML (external sites need absolute URLs).
 * Set NEXT_PUBLIC_WEBRING_URL when using a custom domain (e.g. https://ring.example.com).
 */
export function webringPublicUrl(): string {
  const env = process.env.NEXT_PUBLIC_WEBRING_URL?.trim();
  if (env) return env.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "").replace(/\/$/, "");
    return `https://${host}`;
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return "https://laurier-webring.vercel.app";
}
