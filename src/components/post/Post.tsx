"use client";
import PostControls from "./PostControls";
export default function Post({ body, author, createdAt, likedby }) {
  return (
    <div className="flex flex-col gap-4 p-1 my-1 border border-blue-200 rounded-md">
      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          <div>{author}</div>
          <div>{createdAt}</div>
        </div>
      </div>
      <div>{body}</div>
      <PostControls />
    </div>
  );
}
