import { eq } from "drizzle-orm";
import { db } from "@/db";
import { NextResponse } from "next/server";
import { postsTable } from "@/db/schema";
import { getUserSession } from "@/lib/auth";

export async function GET() {
  const { user } = await getUserSession();
  const posts = await db
    .select()
    .from(postsTable)
    .where(eq(postsTable.authorId, user.id));
  if (posts.length === 0) {
    return NextResponse.json({ ok: false, message: "No posts found" });
  }
  return NextResponse.json({ ok: true, posts });
}
