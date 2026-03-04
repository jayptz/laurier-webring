import { type NextRequest, NextResponse } from "next/server";
import members from "@/data/members.json";

export async function GET(request: NextRequest) {
  const from = request.nextUrl.searchParams.get("from");

  if (!from) {
    return NextResponse.json({ error: "Missing 'from' parameter" }, { status: 400 });
  }

  const index = members.findIndex((m) => m.id === from);

  if (index === -1) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  const prevIndex = (index - 1 + members.length) % members.length;
  return NextResponse.redirect(members[prevIndex].url);
}
