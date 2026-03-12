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

import { RingGraph } from "../components/RingGraph";
import { RingWidget } from "../components/RingWidget";
import { SearchableMemberList } from "../components/SearchableMemberList";

export default function Home() {
  return (
    <div className="min-h-screen px-6 py-16 sm:px-12 md:px-20 lg:px-32">
      <div className="fixed bottom-6 left-6 z-50">
        <RingWidget memberId="priya" />
      </div>
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <SearchableMemberList students={students} />
        <div className="max-w-lg md:text-right md:ml-0 md:self-start md:shrink-0">
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
          ).{" "}
          <a
            href="/connect"
            className="text-purple-700 underline decoration-purple/30 underline-offset-2 transition-colors hover:text-purple-dark hover:decoration-purple"
          >
            Connect your site &rarr;
          </a>
        </p>
        <div className="mt-8 w-full" style={{ minHeight: 360 }}>
          <RingGraph members={students} />
        </div>
        </div>
      </div>
    </div>
  );
}
