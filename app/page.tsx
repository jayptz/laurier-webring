const students = [
  {
    name: "Jay Patel",
    year: "Software Developer @ RBC",
    website: "https://jayptz.me",
    socials: ["GitHub", "LinkedIn", "Twitter"],
  },
  {
    name: "Grishma Gosain",
    year: "Product Analyst @ RBC",
    website: "https://grishmagosainuxporfolio.framer.website/",
    socials: ["GitHub"],
  },
  {
    name: "Vrunda Shah",
    year: "3rd year CS",
    website: "http://vrunda.me",
    socials: ["GitHub"],
  },
];

const socialIcons: Record<string, JSX.Element> = {
  GitHub: (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 fill-current"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58 0-.29-.01-1.06-.02-2.09-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.34-1.75-1.34-1.75-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.8 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.65-5.48 5.95.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.22.7.83.58A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  ),
  LinkedIn: (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 fill-current"
    >
      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.24 8.01H4.7V24H.24V8.01zM8.44 8.01h4.29v2.17h.06c.6-1.13 2.06-2.32 4.24-2.32 4.53 0 5.36 2.98 5.36 6.86V24H17.9v-7.86c0-1.88-.03-4.29-2.61-4.29-2.61 0-3.01 2.04-3.01 4.15V24H8.44V8.01z" />
    </svg>
  ),
  Twitter: (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 fill-current"
    >
      <path d="M18.244 3H21L14.52 11.41 22 21h-5.382l-4.2-5.486L7.4 21H5l6.92-9.02L5 3h5.382l3.78 4.956L18.244 3Zm-1.173 16h1.173L8.03 4.91H6.77L17.07 19Z" />
    </svg>
  ),
};

export default function Home() {
  return (
    <div className="min-h-screen px-6 py-16 sm:px-12 md:px-20 lg:px-32">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md">
          <input
            type="search"
            placeholder="Search members, tags, or sites..."
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm outline-none transition focus:border-purple focus:ring-1 focus:ring-purple/60"
          />
          <div className="mt-4 space-y-2 text-sm text-gray-700">
            {students.map((student) => (
              <div key={student.name} className="flex flex-col">
                <span className="font-medium text-gray-900">
                  {student.name}
                </span>
                <div className="mt-0.5 ml-4 flex items-center gap-2 text-xs text-gray-500">
                  <span>{student.year}</span>
                  <a
                    href={student.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-purple-50 text-purple-700 hover:bg-purple-100"
                    aria-label="Portfolio"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-3 w-3"
                    >
                      <path
                        d="M10.59 13.41a1.5 1.5 0 0 0 2.12 0l3.88-3.88a3 3 0 0 0-4.24-4.24L10 7.64"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.41 10.59a1.5 1.5 0 0 0-2.12 0l-3.88 3.88a3 3 0 0 0 4.24 4.24L14 16.36"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <div className="flex gap-1">
                    {student.socials.map((social) => (
                      <span
                        key={social}
                        className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-purple-50 text-purple-700"
                        aria-label={social}
                      >
                        {socialIcons[social]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-lg md:text-right md:ml-0 md:self-start">
        <p className="text-base leading-relaxed text-gray-600">
          Welcome to the official{" "}
          <span className="relative inline-block group">
            <span className="underline decoration-dotted underline-offset-2 cursor-help">
              webring
            </span>
            <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-64 -translate-x-1/2 rounded-md bg-gray-900 px-3 py-2 text-xs leading-snug text-white shadow-lg opacity-0 transition-opacity duration-150 group-hover:opacity-100">
              A webring (or web ring) is a collection of websites linked
              together in a circular structure, usually organized around a
              specific theme, and often educational or social.
            </span>
          </span>{" "}
          of students studying CS at{" "}
          <a
            href="https://www.wlu.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-700 underline decoration-purple/30 underline-offset-2 transition-colors hover:text-purple-dark hover:decoration-purple"
          >
            WLU
          </a>{" "}
          in Ontario, Canada. This is an ongoing project to document one of the
          most talented student bodies in the world, all while making them more
          visible to the public.
        </p>
        <p className="mt-6 text-base leading-relaxed text-gray-600">
          If you&apos;re one of us, we welcome you with open arms (or in this
          case, open{" "}
          <a
            href="https://github.com/jayptz/laurier-webring"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-700 underline decoration-purple/30 underline-offset-2 transition-colors hover:text-purple-dark hover:decoration-purple"
          >
            PRs
          </a>
          ).
        </p>
        </div>
      </div>
    </div>
  );
}
