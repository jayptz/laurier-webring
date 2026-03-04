import { NextResponse } from "next/server";
import members from "@/data/members.json";

export async function GET() {
  const randomIndex = Math.floor(Math.random() * members.length);
  return NextResponse.redirect(members[randomIndex].url);
}
