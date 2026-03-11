type RingWidgetProps = {
  memberId?: string;
  baseUrl?: string;
};

export function RingWidget({
  memberId = "YOUR_ID",
  baseUrl = "https://laurier-webring.vercel.app",
}: RingWidgetProps) {
  return (
    <nav className="inline-flex items-center gap-4 rounded-full border border-purple-200 bg-white px-5 py-2 text-sm shadow-sm">
      <a
        href={`${baseUrl}/api/prev?from=${memberId}`}
        className="font-medium text-purple-700 transition-colors hover:text-purple-900"
      >
        &larr; Prev
      </a>
      <a
        href={baseUrl}
        className="flex items-center gap-1.5"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${baseUrl}/ca_wlfu2.png`}
          alt="WLU Golden Hawk"
          width={24}
          height={24}
          className="h-6 w-6"
        />
        <span className="font-semibold text-purple-800">WLU</span>
      </a>
      <a
        href={`${baseUrl}/api/next?from=${memberId}`}
        className="font-medium text-purple-700 transition-colors hover:text-purple-900"
      >
        Next &rarr;
      </a>
    </nav>
  );
}
