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

import { RingGraph } from "../components/RingGraph";
import { RingWidget } from "../components/RingWidget";
import { SearchableMemberList } from "../components/SearchableMemberList";

export default function Home() {
  return (
    <div className="min-h-screen px-6 py-16 sm:px-12 md:px-20 lg:px-32">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-lg md:ml-0 md:self-start md:shrink-0">
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
          in Ontario, Canada. This is an ongoing project to showcase talent across Laurier. Look through the Hawks and see their work. 
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
        <p className="mt-2 text-base leading-relaxed text-gray-600">
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
        <SearchableMemberList students={students} />
      </div>
      <div className="mt-14 flex justify-center pb-8">
        <RingWidget memberId="priya" />
      </div>
    </div>
  );
}
