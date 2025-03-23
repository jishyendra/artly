"use client";
import CreatePostForm from "@/components/post/Compose";
import React from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <CreatePostForm />
      {children}
    </>
  );
}
