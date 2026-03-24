import { type NextRequest, NextResponse } from "next/server";
import members from "@/data/members.json";
import { WEBRING_HUB_FROM } from "@/lib/webringHubFrom";

export async function GET(request: NextRequest) {
  const from = request.nextUrl.searchParams.get("from");

  if (!from) {
    return NextResponse.json({ error: "Missing 'from' parameter" }, { status: 400 });
  }

  if (members.length === 0) {
    return NextResponse.json({ error: "No members" }, { status: 404 });
  }

  if (from === WEBRING_HUB_FROM) {
    return NextResponse.redirect(members[members.length - 1].url);
  }

  const index = members.findIndex((m) => m.id === from);

  if (index === -1) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  const prevIndex = (index - 1 + members.length) % members.length;
  return NextResponse.redirect(members[prevIndex].url);
}
