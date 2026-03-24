import { RingWidget } from "../../components/RingWidget";
import { webringPublicUrl } from "@/lib/webringPublicUrl";

function buildEmbedSnippet(siteUrl: string) {
  return `<!-- WLU WebRing Widget — points to ${siteUrl} -->
<div style="display:flex;justify-content:center;padding:16px 0;">
  <nav style="display:inline-flex;align-items:center;gap:16px;border:1px solid #E5E0FF;border-radius:9999px;background:#fff;padding:8px 20px;font-family:system-ui,sans-serif;font-size:14px;box-shadow:0 1px 2px rgba(0,0,0,0.05);">
    <a href="${siteUrl}/api/prev?from=YOUR_ID" style="color:#4B2E83;text-decoration:none;font-weight:500;">&larr; Prev</a>
    <a href="${siteUrl}" style="display:flex;align-items:center;gap:6px;text-decoration:none;">
      <img src="${siteUrl}/wlu-logo.png" alt="WLU" width="24" height="24" style="height:24px;width:24px;">
      <span style="font-weight:600;color:#4B2E83;">WLU</span>
    </a>
    <a href="${siteUrl}/api/next?from=YOUR_ID" style="color:#4B2E83;text-decoration:none;font-weight:500;">Next &rarr;</a>
  </nav>
</div>`;
}

export default function ConnectPage() {
  const siteUrl = webringPublicUrl();
  const embedSnippet = buildEmbedSnippet(siteUrl);
  return (
    <div className="min-h-screen px-6 py-16 sm:px-12 md:px-20 lg:px-32">
      <div className="mx-auto max-w-2xl space-y-12">
        <div>
          <a
            href="/"
            className="text-sm text-gray-700 underline decoration-purple/30 underline-offset-2 hover:decoration-purple"
          >
            &larr; Back to the <a className="text-purple-700">Wing</a>
          </a>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            Connect Your Site
          </h1>
          <p className="mt-3 text-base leading-relaxed text-gray-600">
            Add the webring widget to your portfolio to link yourself with other
            Laurier CS students. Visitors can navigate between member sites
            using the &larr; Prev and Next &rarr; buttons. The embed below calls
            this ring at{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">
              {siteUrl}
            </code>
            .
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
          <p className="mt-1 text-sm text-gray-500">
            This is what the widget looks like on your site:
          </p>
          <div className="mt-4 flex justify-center rounded-lg border border-gray-100 bg-gray-50 p-8">
            <RingWidget memberId="your-id" baseUrl={siteUrl} />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            How to Add It
          </h2>
          <ol className="mt-3 list-inside list-decimal space-y-2 text-sm leading-relaxed text-gray-600">
            <li>
              Open a{" "}
              <a
                href="https://github.com/jayptz/laurier-webring"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-700 underline decoration-purple/30 underline-offset-2 hover:decoration-purple"
              >
                pull request
              </a>{" "}
              to add yourself to{" "}
              <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">
                data/members.json
              </code>
            </li>
            <li>
              Once merged, replace{" "}
              <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">
                YOUR_ID
              </code>{" "}
              in the snippet below with your member id
            </li>
            <li>
              Paste the HTML into your site&apos;s footer or wherever you&apos;d
              like the widget
            </li>
          </ol>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Embed Snippet
            </h2>
          </div>
          <div className="relative mt-3">
            <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs leading-relaxed text-gray-700">
              <code>{embedSnippet}</code>
            </pre>
          </div>
          <p className="mt-2 text-xs text-gray-400">
            Copy and paste this HTML into your site. Replace{" "}
            <code className="text-purple-600">YOUR_ID</code> with your member
            id from members.json. Use a custom domain by setting{" "}
            <code className="text-purple-600">NEXT_PUBLIC_WEBRING_URL</code>{" "}
            when building or deploying this app so the snippet matches your
            production URL.
          </p>
        </div>
      </div>
    </div>
  );
}
