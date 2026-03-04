import RingWidget from "@/components/RingWidget";
import MemberCard from "@/components/MemberCard";
import CopyButton from "@/components/CopyButton";
import members from "@/data/members.json";
import Image from "next/image";

const EMBED_SNIPPET = `<!-- Laurier CS WebRing Widget -->
<div style="display:inline-flex;align-items:center;gap:16px;padding:12px 24px;border-radius:9999px;border:1px solid rgba(75,46,131,0.2);background:#fff;font-family:system-ui,sans-serif;font-size:14px;">
  <a href="https://laurier-webring.vercel.app/api/prev?from=YOUR_ID" style="color:#4B2E83;text-decoration:none;font-weight:500;">← Prev</a>
  <a href="https://laurier-webring.vercel.app/api/random" style="display:flex;align-items:center;">
    <img src="https://laurier-webring.vercel.app/hawk.svg" alt="Laurier CS WebRing" width="32" height="32" />
  </a>
  <a href="https://laurier-webring.vercel.app/api/next?from=YOUR_ID" style="color:#4B2E83;text-decoration:none;font-weight:500;">Next →</a>
</div>`;

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-gray-200/60 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2">
            <Image src="/hawk.svg" alt="" width={24} height={24} />
            <span className="text-sm font-semibold text-purple">
              Laurier CS WebRing
            </span>
          </a>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <a href="#members" className="transition-colors hover:text-purple">
              Members
            </a>
            <a
              href="#how-it-works"
              className="transition-colors hover:text-purple"
            >
              How it Works
            </a>
            <a
              href="/join"
              className="rounded-full bg-purple px-4 py-1.5 text-white transition-colors hover:bg-purple-dark"
            >
              Join
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 pt-40 pb-24 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple/20 bg-purple/5 px-4 py-1.5 text-xs font-medium text-purple">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-purple" />
          Open to Laurier CS students
        </div>
        <h1 className="mb-4 max-w-2xl text-5xl leading-tight font-bold tracking-tight text-gray-900 md:text-6xl">
          Laurier CS
          <span className="text-purple"> WebRing</span>
        </h1>
        <p className="mb-10 max-w-lg text-lg leading-relaxed text-gray-500">
          A ring of Laurier student portfolios. Discover projects, meet
          builders.
        </p>
        <div className="mb-12 flex flex-col gap-3 sm:flex-row">
          <a
            href="/join"
            className="rounded-full bg-purple px-8 py-3 font-medium text-white shadow-sm transition-all hover:bg-purple-dark hover:shadow-md"
          >
            Join the Ring
          </a>
          <a
            href="#members"
            className="rounded-full border border-gray-300 bg-white px-8 py-3 font-medium text-gray-700 transition-all hover:border-purple/30 hover:text-purple"
          >
            Browse Members
          </a>
        </div>
        <RingWidget preview />
        <p className="mt-3 text-xs text-gray-400">
          ↑ This widget lives on every member&apos;s site
        </p>
      </section>

      {/* Members */}
      <section id="members" className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">Members</h2>
          <p className="text-gray-500">
            The builders in the ring. Click to visit their sites.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <MemberCard key={member.id} {...member} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="border-t border-gray-200 bg-white py-20"
      >
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">
            How it Works
          </h2>
          <p className="mb-14 text-gray-500">
            Three steps. Five minutes. You&apos;re in.
          </p>
          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                step: "1",
                icon: "📋",
                title: "Apply",
                desc: "Fill out the join form with your name, site URL, and a short blurb.",
              },
              {
                step: "2",
                icon: "🧩",
                title: "Embed the Widget",
                desc: "Copy the HTML snippet below and paste it into your site's footer.",
              },
              {
                step: "3",
                icon: "🔗",
                title: "You're In",
                desc: "Once approved, your site joins the ring. Visitors can hop between members.",
              },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple/10 text-2xl">
                  {s.icon}
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">{s.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Widget snippet */}
      <section id="widget" className="mx-auto max-w-3xl px-6 py-20">
        <div className="text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">
            Copy-Paste Widget
          </h2>
          <p className="mb-8 text-gray-500">
            Add this snippet to your site. Replace{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-purple">
              YOUR_ID
            </code>{" "}
            with your member ID.
          </p>
        </div>
        <div className="mb-6 flex justify-center">
          <RingWidget preview />
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-950">
          <div className="flex items-center justify-between border-b border-gray-800 px-4 py-2">
            <span className="text-xs text-gray-400">HTML</span>
            <CopyButton text={EMBED_SNIPPET} />
          </div>
          <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-gray-300">
            <code>{EMBED_SNIPPET}</code>
          </pre>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-gray-500 sm:flex-row">
          <div className="flex items-center gap-2">
            <Image src="/hawk.svg" alt="" width={20} height={20} />
            <span>Laurier CS WebRing</span>
          </div>
          <div className="flex gap-6">
            <a
              href="https://github.com/laurier-cs-webring"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-purple"
            >
              GitHub
            </a>
            <a href="/join" className="transition-colors hover:text-purple">
              Join
            </a>
            <a href="#members" className="transition-colors hover:text-purple">
              Members
            </a>
            <a
              href="mailto:webring@lauriercs.ca"
              className="transition-colors hover:text-purple"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

