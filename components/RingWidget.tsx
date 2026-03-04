import Image from "next/image";

interface RingWidgetProps {
  memberId?: string;
  baseUrl?: string;
  preview?: boolean;
}

export default function RingWidget({
  memberId = "YOUR_ID",
  baseUrl = "",
  preview = false,
}: RingWidgetProps) {
  const prevHref = preview ? "#" : `${baseUrl}/api/prev?from=${memberId}`;
  const nextHref = preview ? "#" : `${baseUrl}/api/next?from=${memberId}`;
  const randomHref = preview ? "#" : `${baseUrl}/api/random`;

  return (
    <div className="inline-flex items-center gap-4 rounded-full border border-[#4B2E83]/20 bg-white px-6 py-3 shadow-sm">
      <a
        href={prevHref}
        className="text-sm font-medium text-[#4B2E83] transition-colors hover:text-[#3a2366]"
        aria-label="Previous member"
      >
        ← Prev
      </a>
      <a
        href={randomHref}
        className="flex items-center"
        aria-label="Random member"
      >
        <Image
          src="/hawk.svg"
          alt="Laurier Golden Hawk"
          width={32}
          height={32}
          className="opacity-90 transition-opacity hover:opacity-100"
        />
      </a>
      <a
        href={nextHref}
        className="text-sm font-medium text-[#4B2E83] transition-colors hover:text-[#3a2366]"
        aria-label="Next member"
      >
        Next →
      </a>
    </div>
  );
}
