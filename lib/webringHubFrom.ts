/**
 * Use as `from=` on `/api/prev` and `/api/next` when linking from the webring hub.
 * Next → first member in `members.json`; prev → last member (wrap). URLs stay neutral
 * (no member id).
 */
export const WEBRING_HUB_FROM = "__hub__" as const;
