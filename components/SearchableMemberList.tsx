"use client";

import { useState, useCallback, type ReactElement } from "react";

import {
  memberListMobileMaxHeight,
  memberListTableViewportHeight,
} from "@/lib/memberListLayout";

type SocialKey = "GitHub" | "LinkedIn" | "Twitter";

type SocialLink = {
  kind: SocialKey;
  url: string;
};

type Student = {
  name: string;
  year: string;
  gradYear?: string;
  website: string;
  socials: SocialLink[];
};

const socialIcons: Record<SocialKey, ReactElement> = {
  GitHub: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58 0-.29-.01-1.06-.02-2.09-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.34-1.75-1.34-1.75-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.8 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.65-5.48 5.95.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.22.7.83.58A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.24 8.01H4.7V24H.24V8.01zM8.44 8.01h4.29v2.17h.06c.6-1.13 2.06-2.32 4.24-2.32 4.53 0 5.36 2.98 5.36 6.86V24H17.9v-7.86c0-1.88-.03-4.29-2.61-4.29-2.61 0-3.01 2.04-3.01 4.15V24H8.44V8.01z" />
    </svg>
  ),
  Twitter: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M18.244 3H21L14.52 11.41 22 21h-5.382l-4.2-5.486L7.4 21H5l6.92-9.02L5 3h5.382l3.78 4.956L18.244 3Zm-1.173 16h1.173L8.03 4.91H6.77L17.07 19Z" />
    </svg>
  ),
};

function truncate(str: string, maxLen = 15): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen) + "...";
}

function matchesSearch(student: Student, term: string): boolean {
  const t = term.toLowerCase();
  return student.name.toLowerCase().includes(t);
}

function relevanceScore(student: Student, term: string): number {
  const t = term.toLowerCase().trim();
  if (!t) return 0;

  const name = student.name.toLowerCase();
  const role = student.year.toLowerCase();
  const website = student.website.toLowerCase();
  const grad = (student.gradYear ?? "").toLowerCase();

  // Heavier weight to name matches, then role/company, then website/year.
  if (name === t) return 100;
  if (name.startsWith(t)) return 80;
  if (name.includes(t)) return 60;
  if (role.startsWith(t)) return 50;
  if (role.includes(t)) return 40;
  if (website.includes(t)) return 30;
  if (grad.includes(t)) return 20;
  return 0;
}

function highlightMatch(text: string, term: string): ReactElement | string {
  const q = term.trim();
  if (!q) return text;

  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(${escaped})`, "ig");
  const parts = text.split(re);

  if (parts.length === 1) return text;

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === q.toLowerCase() ? (
          <mark key={`${part}-${i}`} className="bg-yellow-200/70 px-0.5 text-inherit">
            {part}
          </mark>
        ) : (
          <span key={`${part}-${i}`}>{part}</span>
        ),
      )}
    </>
  );
}

function formatGradYearMobile(gradYear?: string): string {
  // member.json uses full years like "2025"/"2026"/"2027".
  // Mobile should show "Class of '25"/"Class of '26"/etc.
  const fallback = "2027";
  const raw = (gradYear ?? fallback).trim();
  if (!raw) return "'27";
  if (raw.startsWith("'")) return raw; // already formatted

  const digits = raw.replace(/\D/g, "");
  const lastTwo = digits.slice(-2);
  if (!lastTwo) return "'27";
  return `'${lastTwo}`;
}

export function SearchableMemberList({
  students,
}: {
  students: Student[];
}) {
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();
  const nameMatches = query
    ? students.filter((s) => matchesSearch(s, query))
    : students;
  const exactMatches = query
    ? nameMatches.filter((s) => s.name.toLowerCase() === query)
    : [];

  const filtered = query
    ? (exactMatches.length > 0 ? exactMatches : nameMatches).sort(
        (a, b) => relevanceScore(b, query) - relevanceScore(a, query),
      )
    : students;

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const colgroup = (
    <colgroup>
      <col style={{ width: "auto" }} />
      <col style={{ width: "7rem" }} />
      <col style={{ width: "5rem" }} />
      <col style={{ width: "18ch" }} />
    </colgroup>
  );

  const tableClass =
    "w-full min-w-0 text-sm border-collapse table-fixed md:min-w-[520px]";

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      <input
        id="searchInput"
        type="search"
        value={search}
        onChange={handleInput}
        placeholder="roles, names, companies, ..."
        className="min-h-11 w-full rounded-none border border-border bg-white px-4 py-3 text-base text-gray-800 shadow-sm outline-none transition focus:border-purple focus:ring-1 focus:ring-purple/60"
      />

      {/* Narrow viewports: stacked cards, no horizontal table scroll */}
      <div
        className="md:hidden overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch]"
        style={{ maxHeight: memberListMobileMaxHeight() }}
      >
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-500">No members match your search.</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {filtered.map((student) => (
              <li
                key={student.name}
                className="border-b border-purple-500/50 pb-4 last:border-b-0"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <div className="font-medium text-gray-900">
                        {highlightMatch(student.name, search)}
                      </div>
                      <div className="text-xs text-gray-600 whitespace-nowrap">
                        {formatGradYearMobile(student.gradYear)}
                      </div>
                    </div>
                    <div className="mt-0.5 text-xs text-gray-600">{student.year}</div>
                  </div>

                  <div className="flex flex-wrap justify-end gap-1.5 border-l border-purple-500/30 pl-3 pt-0.5">
                    {student.socials.map((social) => (
                      <a
                        key={social.kind}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid h-8 w-8 shrink-0 place-items-center text-purple-700 [&>svg]:block [&>svg]:h-4 [&>svg]:w-4"
                        aria-label={social.kind}
                      >
                        {socialIcons[social.kind]}
                      </a>
                    ))}
                  </div>
                </div>
                <a
                  href={student.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block break-all text-sm font-mono text-yellow-600 underline decoration-yellow-500/50 underline-offset-2"
                >
                  {student.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div
        className="hidden min-h-0 flex-col overflow-hidden md:flex"
        style={{ maxHeight: memberListTableViewportHeight() }}
      >
        <div className="flex min-h-0 flex-1 flex-col overflow-x-auto">
          {/* Same inset + direction as the body scroller so header columns line up with rows */}
          <div className="shrink-0 pl-5 [direction:rtl] [scrollbar-gutter:stable]">
            <div className="[direction:ltr] min-w-0">
              <table className={tableClass}>
                {colgroup}
                <thead className="bg-card">
                  <tr className="border-b border-border">
                    <th className="pb-2 pt-1 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Name
                    </th>
                    <th className="pb-2 pt-1 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 w-28">
                      Socials
                    </th>
                    <th className="pb-2 pt-1 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 w-20">
                      Year
                    </th>
                    <th className="pb-2 pt-1 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 w-[18ch]">
                      Website
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div
            className="min-h-0 flex-1 overflow-y-auto pl-5 [direction:rtl] [scrollbar-gutter:stable]"
            role="region"
            aria-label="Member list"
          >
            <div className="[direction:ltr] min-w-0">
              <table className={tableClass}>
                {colgroup}
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="pt-4 text-sm text-gray-500">
                        No members match your search.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((student) => (
                      <tr key={student.name} className="border-b border-purple-500">
                        <td className="py-4 pr-1 align-top">
                          <div>
                            <span className="font-medium text-gray-900" title={student.name}>
                              {highlightMatch(student.name, search)}
                            </span>
                            <span className="block text-xs text-gray-600 mt-0.5" title={student.year}>
                              {student.year}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 pr-4 align-top">
                          <div className="flex gap-1 items-center">
                            {student.socials.map((social) => (
                              <a
                                key={social.kind}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="grid h-6 w-6 shrink-0 place-items-center text-purple-700 [&>svg]:block [&>svg]:shrink-0"
                                aria-label={social.kind}
                              >
                                {socialIcons[social.kind]}
                              </a>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 pr-4 align-top text-gray-600">
                          {student.gradYear ?? "2027"}
                        </td>
                        <td className="py-4 align-top">
                          <a
                            href={student.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-yellow-600 underline decoration-yellow-500/50 underline-offset-2 hover:text-yellow-700 font-mono"
                            title={student.website}
                          >
                            {truncate(
                              student.website.replace(/^https?:\/\//, "").replace(/\/$/, ""),
                              15,
                            )}
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
