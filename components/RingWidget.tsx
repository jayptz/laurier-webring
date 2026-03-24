type RingWidgetProps = {
  memberId?: string;
  /**
   * Full site origin for off-site embeds. Omit on this app to use same-origin `/api/*` links.
   */
  baseUrl?: string;
};

export function RingWidget({
  memberId = "YOUR_ID",
  baseUrl,
}: RingWidgetProps) {
  const root = baseUrl?.replace(/\/$/, "");
  const prevHref = root
    ? `${root}/api/prev?from=${encodeURIComponent(memberId)}`
    : `/api/prev?from=${encodeURIComponent(memberId)}`;
  const nextHref = root
    ? `${root}/api/next?from=${encodeURIComponent(memberId)}`
    : `/api/next?from=${encodeURIComponent(memberId)}`;
  const homeHref = root ?? "/";

  return (
    <nav className="grid w-full max-w-sm grid-cols-3 items-center gap-3 text-base text-gray-600 sm:max-w-md sm:gap-5">
      <a
        href={prevHref}
        className="justify-self-start font-medium transition-colors hover:text-gray-900"
      >
        &larr;
      </a>
      <a
        href={homeHref}
        className="flex justify-center"
        aria-label="WLU WebRing home"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/laurier-goldenhawk.svg"
          alt="Golden Hawk"
          width={32}
          height={32}
          className="h-8 w-8 grayscale"
        />
      </a>
      <a
        href={nextHref}
        className="justify-self-end font-medium transition-colors hover:text-gray-900"
      >
        &rarr;
      </a>
    </nav>
  );
}
