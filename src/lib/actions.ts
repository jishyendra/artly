"use server";
import { type UrlValues } from "./validation/post";
import { db } from "@/db";
import { postsTable } from "@/db/schema";
import { auth } from "./auth";
import { headers } from "next/headers";

export async function createPost(formData: FormData) {
  //TODO: Validate form data
  //TODO: validate incoming data
  const { user } = await auth.api.getSession({
    headers: await headers(),
  });
  const body = formData.get("body");
  const urls = formData.get("urls");
  const urlList = JSON.parse(urls as string).map((item: UrlValues) =>
    JSON.stringify(item),
  );

  const postId = await db
    .insert(postsTable)
    .values({
      body: body as string,
      authorId: user.id,
      urlList: urlList,
    })
    .returning({ postId: postsTable.postId });
  console.log("returned postId: ", postId);
  return {
    success: true,
    message: "Post created successfully",
    data: { body, urls },
  };
}

// export async function createComment(formData: FormData) {
//   const comment = formData.get("comment");
//   const postId = formData.get("postId");
//   await db.insert(commentsTable).values({ body: comment, postId: postId });
// }
