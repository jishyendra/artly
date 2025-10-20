"use server";
import { type UrlValues } from "./validation/post";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { gifts, posts, type GiftValues, likes, collections } from "@/db/schema";
import { auth, type Session } from "./auth";
import { headers } from "next/headers";
import { postSchema } from "./validation/post";

type ActionResponseValues = {
  success: boolean;
  result: any | null;
  error: any | null;
};

export async function createPost(
  formData: FormData,
): Promise<ActionResponseValues> {
  //TODO: Validate form data
  //TODO: validate incoming data
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  // if (!data)
  //   return {
  //     success: false,
  //     result: null,
  //     error: "Unauthorized: Failed to validate sesssion data",
  //   };

  const { user } = data;
  const body = formData.get("body");
  const urls = formData.get("urls");

  const parsed = postSchema.safeParse({ body, urls });
  if (!parsed.success) {
    return {
      success: false,
      result: null,
      error: "Invalid data",
    };
  }

  const urlList = JSON.parse(urls as string).map((item: UrlValues) =>
    JSON.stringify(item),
  );

  const res = await db
    .insert(posts)
    .values({
      body: body as string,
      authorId: user.id,
      urlList: urlList,
    })
    .returning({ postId: posts.postId });

  return {
    success: true,
    result: { body, urls, postId: res.at(0)?.postId },
    error: null,
  };
}

export async function onNewGift(
  formData: FormData,
): Promise<ActionResponseValues> {
  const data = formData.get("transactionId");
  const postId = formData.get("postId");
  const sender = formData.get("senderId");

  if (!data || !postId || !sender) {
    return { success: false, result: null, error: "Invalid details" };
  }
  const res = await db
    .insert(gifts)
    .values({
      postId: postId as string,
      transactionId: data as string,
      senderId: sender as string,
    })
    .returning({ id: gifts.giftId });

  if (!res.at(0)?.id) {
    console.log(res);
    return { success: false, result: null, error: "Gifting failed" };
  }
  return { success: true, result: res.at(0)?.id, error: null };
}

export async function add_like({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}): Promise<ActionResponseValues> {
  try {
    await db.insert(likes).values({ postId, userId });
    return {
      success: true,
      result: null,
      error: null,
    };
  } catch (err) {
    return {
      success: false,
      result: null,
      error: "Error adding like, Please try again.",
    };
  }
}

export async function add_to_collection(
  postId: string,
  userId: string,
): Promise<ActionResponseValues> {
  try {
    const res = await db
      .select({ isCollactable: posts.isCollactable })
      .from(posts)
      .where(eq(posts.postId, postId));
      if(res.length === 0 || !res[0]?.isCollactable){
        return {
          success: false,
          result:null,
          error: "Post is not collactable",
        }

      }

    await db.insert(collections).values({ postId, collectedBy: userId });
    return {
      success: true,
      result: null,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error: "Error adding to collection please try again.",
      result: null,
    };
  }
}
