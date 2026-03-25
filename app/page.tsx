const students = [
  { name: "Jay Patel", year: "Software Developer @ RBC", gradYear: "2027", website: "https://jayptz.me", socials: ["GitHub", "LinkedIn", "Twitter"] },
  { name: "Grishma Gosain", year: "Product Analyst @ RBC", gradYear: "2027", website: "https://grishmagosainuxporfolio.framer.website/", socials: ["GitHub"] },
  { name: "Vrunda Shah", year: "3rd year CS", gradYear: "2027", website: "http://vrunda.me", socials: ["GitHub"] },
  { name: "Alex Chen", year: "4th year CS", gradYear: "2027", website: "https://alexchen.dev", socials: ["GitHub", "LinkedIn"] },
  { name: "Sarah Kim", year: "DevOps Engineer @ Shopify", gradYear: "2027", website: "https://sarahkim.ca", socials: ["GitHub", "Twitter"] },
  { name: "Marcus Johnson", year: "2nd year CS", gradYear: "2027", website: "https://marcusj.dev", socials: ["GitHub"] },
  { name: "Emily Zhang", year: "ML Engineer @ Google", gradYear: "2027", website: "https://emilyzhang.io", socials: ["GitHub", "LinkedIn"] },
  { name: "David Park", year: "3rd year CS", gradYear: "2027", website: "https://davidpark.me", socials: ["GitHub", "Twitter"] },
  { name: "Olivia Brown", year: "Frontend Dev @ Meta", gradYear: "2027", website: "https://oliviabrown.com", socials: ["GitHub", "LinkedIn"] },
  { name: "James Wilson", year: "4th year CS", gradYear: "2027", website: "https://jameswilson.dev", socials: ["GitHub"] },
  { name: "Sophia Lee", year: "Backend Engineer @ Amazon", gradYear: "2027", website: "https://sophialee.ca", socials: ["GitHub", "LinkedIn", "Twitter"] },
  { name: "Daniel Martinez", year: "3rd year CS", gradYear: "2027", website: "https://danielm.dev", socials: ["GitHub"] },
  { name: "Isabella Garcia", year: "Security Analyst @ TD", gradYear: "2027", website: "https://isabellagarcia.io", socials: ["GitHub", "LinkedIn"] },
  { name: "Ethan Taylor", year: "2nd year CS", gradYear: "2027", website: "https://ethantaylor.me", socials: ["GitHub", "Twitter"] },
  { name: "Ava Anderson", year: "4th year CS", gradYear: "2027", website: "https://avaanderson.dev", socials: ["GitHub", "LinkedIn"] },
  { name: "Noah Thomas", year: "Full Stack @ Scotiabank", gradYear: "2027", website: "https://noahthomas.ca", socials: ["GitHub"] },
  { name: "Mia Jackson", year: "3rd year CS", gradYear: "2027", website: "https://miajackson.io", socials: ["GitHub", "LinkedIn"] },
  { name: "Liam White", year: "Data Scientist @ CIBC", gradYear: "2027", website: "https://liamwhite.dev", socials: ["GitHub", "Twitter"] },
  { name: "Charlotte Harris", year: "2nd year CS", gradYear: "2027", website: "https://charlotteharris.me", socials: ["GitHub"] },
  { name: "Benjamin Clark", year: "4th year CS", gradYear: "2027", website: "https://benjaminclark.ca", socials: ["GitHub", "LinkedIn"] },
  { name: "Amelia Lewis", year: "Mobile Dev @ Rogers", gradYear: "2027", website: "https://amelialewis.io", socials: ["GitHub"] },
  { name: "Lucas Robinson", year: "3rd year CS", gradYear: "2027", website: "https://lucasrobinson.dev", socials: ["GitHub", "Twitter"] },
  { name: "Harper Walker", year: "Cloud Engineer @ Microsoft", gradYear: "2027", website: "https://harperwalker.ca", socials: ["GitHub", "LinkedIn"] },
  { name: "Henry Hall", year: "2nd year CS", gradYear: "2027", website: "https://henryhall.me", socials: ["GitHub"] },
  { name: "Evelyn Young", year: "4th year CS", gradYear: "2027", website: "https://evelynyoung.dev", socials: ["GitHub", "LinkedIn"] },
  { name: "Alexander King", year: "QA Engineer @ IBM", gradYear: "2027", website: "https://alexanderking.io", socials: ["GitHub"] },
  { name: "Abigail Wright", year: "3rd year CS", gradYear: "2027", website: "https://abigailwright.ca", socials: ["GitHub", "LinkedIn", "Twitter"] },
  { name: "Sebastian Scott", year: "2nd year CS", gradYear: "2027", website: "https://sebastianscott.me", socials: ["GitHub"] },
  { name: "Elizabeth Green", year: "DevOps @ Bell", gradYear: "2027", website: "https://elizabethgreen.dev", socials: ["GitHub", "LinkedIn"] },
  { name: "Jack Adams", year: "4th year CS", gradYear: "2027", website: "https://jackadams.io", socials: ["GitHub"] },
  { name: "Sofia Baker", year: "3rd year CS", gradYear: "2027", website: "https://sofiabaker.ca", socials: ["GitHub", "Twitter"] },
  { name: "Owen Nelson", year: "Backend @ Uber", gradYear: "2027", website: "https://owennelson.dev", socials: ["GitHub", "LinkedIn"] },
  { name: "Avery Hill", year: "2nd year CS", gradYear: "2027", website: "https://averyhill.me", socials: ["GitHub"] },
  { name: "Ella Campbell", year: "4th year CS", gradYear: "2027", website: "https://ellacampbell.io", socials: ["GitHub", "LinkedIn"] },
  { name: "Samuel Mitchell", year: "ML Engineer @ Tesla", gradYear: "2027", website: "https://samuelmitchell.ca", socials: ["GitHub"] },
  { name: "Scarlett Roberts", year: "3rd year CS", gradYear: "2027", website: "https://scarlettroberts.dev", socials: ["GitHub", "LinkedIn"] },
  { name: "Matthew Turner", year: "2nd year CS", gradYear: "2027", website: "https://matthewturner.me", socials: ["GitHub", "Twitter"] },
  { name: "Grace Phillips", year: "Frontend @ Stripe", gradYear: "2027", website: "https://gracephillips.io", socials: ["GitHub", "LinkedIn"] },
  { name: "Joseph Evans", year: "4th year CS", gradYear: "2027", website: "https://josephevans.ca", socials: ["GitHub"] },
  { name: "Chloe Parker", year: "3rd year CS", gradYear: "2027", website: "https://chloeparker.dev", socials: ["GitHub", "LinkedIn", "Twitter"] },
  { name: "David Turner", year: "Security @ Deloitte", gradYear: "2027", website: "https://davidturner.io", socials: ["GitHub"] },
];

import members from "@/data/members.json";
import { WEBRING_HUB_FROM } from "@/lib/webringHubFrom";
import { RingGraph } from "../components/RingGraph";
import { RingWidget } from "../components/RingWidget";
import { SearchableMemberList } from "../components/SearchableMemberList";

const studentsFromMembersJson = members.map((m: any) => {
  const asUrlOrEmpty = (v: unknown): string => {
    if (typeof v !== "string") return "";
    const s = v.trim();
    // Expect full URLs so the icons can be clickable.
    return /^https?:\/\//i.test(s) ? s : "";
  };

  const socials: { kind: "GitHub" | "LinkedIn" | "Twitter"; url: string }[] =
    [];

  const githubUrl = asUrlOrEmpty(m.Github ?? m.github ?? m.GitHub);
  if (githubUrl) socials.push({ kind: "GitHub", url: githubUrl });

  const linkedinUrl = asUrlOrEmpty(m.Linkedin ?? m.linkedin ?? m.LinkedIn);
  if (linkedinUrl) socials.push({ kind: "LinkedIn", url: linkedinUrl });

  // JSON uses `X` but the icon key is `Twitter`.
  const xUrl = asUrlOrEmpty(m.X ?? m.Twitter ?? m.twitter);
  if (xUrl) socials.push({ kind: "Twitter", url: xUrl });

  return {
    name: m.name as string,
    year: (m.Role ?? m.role ?? "") as string,
    gradYear: (m.Year ?? m.GradYear ?? m.gradYear ?? undefined) as
      | string
      | undefined,
    website: m.url as string,
    socials,
  };
});

/** Shared card chrome (border, padding) — tighter on very small screens. */
const cardSurface =
  "rounded-none border border-border bg-card p-4 shadow-sm ring-1 ring-purple/10 sm:p-6";

/** Full-width in column; min-w-0 prevents grid/flex overflow on narrow viewports. */
const ringColumnFrame = "w-full min-w-0 max-w-2xl shrink-0";

export default function Home() {
  return (
    <div className="min-h-screen px-6 py-16 sm:px-12 md:px-20 lg:px-32">
      {/*
        Left: welcome (with Laurier mark) → web graph. Right: member list.
        Mobile: welcome, graph, then table (column order).
      */}
      <div className="mx-auto flex min-w-0 max-w-[1600px] flex-col gap-[clamp(1.25rem,4vw,2rem)] md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start md:gap-x-[clamp(1.5rem,4vw,2.5rem)] md:gap-y-8">
        <div className="flex min-w-0 max-md:order-1 flex-col gap-8">
          <div className={`${ringColumnFrame} ${cardSurface}`}>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.wlu.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="block max-w-full leading-none"
                aria-label="Wilfrid Laurier University (opens in a new tab)"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- static public branding */}
                <img
                  src="/Wilfrid-Laurier-University-logo-removebg-preview.png"
                  alt="Wilfrid Laurier University"
                  width={908}
                  height={275}
                  className="block h-[clamp(4rem,12vw,7rem)] w-auto max-w-full"
                />
              </a>
              <div className="min-w-0">
                <p className="text-base leading-relaxed text-gray-600">
                  Welcome to the official{" "}
                  <span className="relative inline-block group">
                    <span className="bg-yellow-200 underline decoration-dotted underline-offset-2 cursor-help">
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
                  in Ontario, Canada. This is an ongoing project to showcase talent
                  across Laurier. Look through the Hawks and see their work.
                </p>
                <p className="mt-6 text-base leading-relaxed text-gray-600">
                  Admission is simple: ship something, then open a{" "}
                  <a
                    href="https://github.com/jayptz/laurier-webring"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-700 underline decoration-purple/30 underline-offset-2 transition-colors hover:text-purple-dark hover:decoration-purple"
                  >
                    PR
                  </a>
                  .
                </p>
                <p className="mt-4 text-base leading-relaxed text-gray-600">
                  <a
                    href="/connect"
                    className="text-purple-700 underline decoration-purple/30 underline-offset-2 transition-colors hover:text-purple-dark hover:decoration-purple"
                  >
                    Connect your site &rarr;
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div
            className={`${ringColumnFrame} min-w-0 overflow-hidden touch-manipulation`}
          >
            <RingGraph members={studentsFromMembersJson} />
          </div>
        </div>

        <div className="relative z-10 flex min-w-0 max-md:order-2 flex-col gap-8">
          <div className={`${ringColumnFrame} ${cardSurface}`}>
            <SearchableMemberList students={studentsFromMembersJson} />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-[clamp(2rem,6vw,3.5rem)] flex w-full max-w-[1600px] justify-center border-t border-border pt-10 pb-8">
        <div className="rounded-none border border-border bg-card px-6 py-4 shadow-sm ring-1 ring-purple/10 sm:px-8">
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
            Visit member sites
          </p>
          <RingWidget memberId={WEBRING_HUB_FROM} />
        </div>
      </div>
    </div>
  );
}
