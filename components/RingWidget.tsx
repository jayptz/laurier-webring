type RingWidgetProps = {
  memberId?: string;
  baseUrl?: string;
};

export function RingWidget({
  memberId = "YOUR_ID",
  baseUrl = "https://laurier-webring.vercel.app",
}: RingWidgetProps) {
  return (
    <nav className="inline-flex items-center gap-4 text-sm text-gray-600">
      <a
        href={`${baseUrl}/api/prev?from=${memberId}`}
        className="font-medium transition-colors hover:text-gray-900"
      >
        &larr; 
      </a>
      <a
        href={baseUrl}
        className="flex items-center gap-1.5 -ml-1"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/laurier-goldenhawk.svg"
          alt="Golden Hawk"
          width={24}
          height={24}
          className="h-6 w-6 grayscale"
        />
        <span className="font-semibold text-gray-800"></span>
      </a>
      <a
        href={`${baseUrl}/api/next?from=${memberId}`}
        className="font-medium transition-colors hover:text-gray-900"
      >
         &rarr;
      </a>
    </nav>
  );
}
