type RingWidgetProps = {
  memberId?: string;
  baseUrl?: string;
};

export function RingWidget({
  memberId = "YOUR_ID",
  baseUrl = "https://laurier-webring.vercel.app",
}: RingWidgetProps) {
  return (
    <nav className="grid w-full max-w-sm grid-cols-3 items-center gap-3 text-base text-gray-600 sm:max-w-md sm:gap-5">
      <a
        href={`${baseUrl}/api/prev?from=${memberId}`}
        className="justify-self-start font-medium transition-colors hover:text-gray-900"
      >
        &larr;
      </a>
      <a
        href={baseUrl}
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
        href={`${baseUrl}/api/next?from=${memberId}`}
        className="justify-self-end font-medium transition-colors hover:text-gray-900"
      >
        &rarr;
      </a>
    </nav>
  );
}
