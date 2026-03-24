interface MemberCardProps {
  name: string;
  url: string;
  tags: string[];
  blurb: string;
}

export default function MemberCard({ name, url, tags, blurb }: MemberCardProps) {
  const domain = new URL(url).hostname;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl border border-border bg-white p-6 transition-all hover:border-[#4B2E83]/30 hover:shadow-md"
    >
      <div className="mb-3 flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#4B2E83]">
          {name}
        </h3>
        <div className="flex gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#4B2E83]/10 px-2.5 py-0.5 text-xs font-medium text-[#4B2E83]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <p className="mb-3 text-sm leading-relaxed text-gray-600">{blurb}</p>
      <span className="text-xs text-gray-400 group-hover:text-[#4B2E83]/60">
        {domain} ↗
      </span>
    </a>
  );
}
