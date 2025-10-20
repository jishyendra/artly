import { eq } from "drizzle-orm";
import { db } from "@/db";
import { NextResponse } from "next/server";
import { posts} from "@/db/schema";
import { getUserSession } from "@/lib/auth";

export async function GET() {
  const { user } = await getUserSession();
  const res= await db
    .select()
    .from(posts)
    .where(eq(posts.authorId, user.id));
  if (res.length === 0) {
    return NextResponse.json({ ok: false, message: "No posts found" });
  }
  return NextResponse.json({ ok: true, res});
}
