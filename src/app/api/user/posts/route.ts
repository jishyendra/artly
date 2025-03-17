import { eq } from "drizzle-orm";
import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { postsTable } from "@/db/schema";
import { getUserSession, Session } from "@/lib/auth";

export async function GET(req: Request, res: Response) {
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
