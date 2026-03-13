type RingWidgetProps = {
  memberId?: string;
  baseUrl?: string;
};

export function RingWidget({
  memberId = "YOUR_ID",
  baseUrl = "https://laurier-webring.vercel.app",
}: RingWidgetProps) {
  return (
    <nav className="inline-flex items-center gap-4 text-sm">
      <a
        href={`${baseUrl}/api/prev?from=${memberId}`}
        className="font-medium text-purple-700 transition-colors hover:text-purple-900"
      >
        &larr; 
      </a>
      <a
        href={baseUrl}
        className="flex items-center gap-1.5 -ml-1"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Old_Waterloo_Lutheran_Golden_Hawks.png"
          alt="Golden Hawk"
          width={24}
          height={24}
          className="h-6 w-6"
        />
        <span className="font-semibold text-purple-800"></span>
      </a>
      <a
        href={`${baseUrl}/api/next?from=${memberId}`}
        className="font-medium text-purple-700 transition-colors hover:text-purple-900"
      >
         &rarr;
      </a>
    </nav>
  );
}
