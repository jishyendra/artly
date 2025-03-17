"use client";
import Post from "@/components/post/Post";
import useSWR from "swr";

export default function Timeline() {
  async function getPosts() {
    return await fetch("/api/user/posts").then((res) => res.json());
  }

  const { isLoading, data: res, error } = useSWR("api/user/posts", getPosts);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>No posts found</p>;
  }
  return (
    <div>
      {res.posts?.map((post, key) => (
        <Post
          key={key}
          body={post.body}
          likedby={post.likedby.length}
          createdAt={post.createdAt}
          author={post.authorId}
        />
      ))}
    </div>
  );
}
