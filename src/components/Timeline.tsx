"use client";
import Post from "@/components/post/Post";
import useSWR from "swr";
import { type PostValues } from "@/db/schema";
import { UrlValues } from "@/lib/validation/post";

export default function Timeline() {
  async function getPosts() {
    return await fetch("/api/user/posts").then((res) => res.json());
  }

  const { isLoading, data, error } = useSWR("api/user/posts", getPosts);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>No posts found</p>;
  }
  const res = data;
  return (
    <div>
      {res.posts?.map((post: PostValues, key: any) => (
        <Post
          key={key}
          body={post.body}
          likedBy={post.likedby.length}
          createdAt={post.createdAt as Date}
          author={post.authorId as string}
          postId={post.postId as string}
          urls={post.urlList?.map(
            (url: string) => JSON.parse(url) as UrlValues,
          )}
        />
      ))}
    </div>
  );
}
