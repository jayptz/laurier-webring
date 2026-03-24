import Image from "next/image";

export default function JoinPage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-border/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2">
            <Image src="/Old_Waterloo_Lutheran_Golden_Hawks.png" alt="" width={24} height={24} />
            <span className="text-sm font-semibold text-purple">
              Laurier CS WebRing
            </span>
          </a>
          <a
            href="/"
            className="text-sm text-gray-600 transition-colors hover:text-purple"
          >
            ← Back
          </a>
        </div>
      </nav>

      <main className="mx-auto max-w-xl px-6 pt-32 pb-20">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          Join the Ring
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-gray-500">
          We&apos;d love to have you. The webring is open to any Laurier CS
          student with a personal website or portfolio.
        </p>

        <div className="mb-10 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Requirements
          </h2>
          <ul className="space-y-3 text-sm text-gray-600">
            {[
              "You're a current or former Laurier CS student",
              "You have a personal website or portfolio",
              "You add the webring widget snippet to your site",
              "Your site has some original content (a project, blog, etc.)",
            ].map((req) => (
              <li key={req} className="flex items-start gap-2">
                <span className="mt-0.5 text-purple">✓</span>
                {req}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-10 rounded-xl border-2 border-dashed border-purple/30 bg-purple/5 p-8 text-center">
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Application Form
          </h2>
          <p className="mb-6 text-sm text-gray-500">
            Fill out this short form and we&apos;ll review your site within 48
            hours.
          </p>
          <a
            href="https://forms.gle/placeholder"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-purple px-8 py-3 font-medium text-white transition-colors hover:bg-purple-dark"
          >
            Open Google Form →
          </a>
        </div>

        <div className="rounded-xl border border-border bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            After You Apply
          </h2>
          <ol className="space-y-3 text-sm text-gray-600">
            {[
              "We review your site and confirm eligibility",
              "You'll be added to members.json with your unique ID",
              "Add the widget snippet to your site's footer",
              "Your site is now part of the ring!",
            ].map((step, i) => (
              <li key={step} className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple/10 text-xs font-semibold text-purple">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </main>
    </div>
  );
}
