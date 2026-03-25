/**
 * Canonical public origin for embed HTML (external sites need absolute URLs).
 *
 * - Set `NEXT_PUBLIC_WEBRING_URL` to override (e.g. forks or staging).
 * - We intentionally do **not** use `VERCEL_URL`: on previews it is the long
 *   `*.vercel.app` host, not your custom domain (e.g. laurier.network).
 */
const DEFAULT_PUBLIC_ORIGIN = "https://laurier.network";

export function webringPublicUrl(): string {
  const env = process.env.NEXT_PUBLIC_WEBRING_URL?.trim();
  if (env) return env.replace(/\/$/, "");

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return DEFAULT_PUBLIC_ORIGIN;
}
