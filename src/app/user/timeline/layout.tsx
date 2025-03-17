"use client";
import CreatePostForm from "@/components/post/Compose";
import React from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto max-w-3xl px-4">
      <CreatePostForm />
      {children}
    </div>
  );
}
