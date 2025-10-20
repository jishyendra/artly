"use client";
import Link from "next/link";
import Avatar from "./Avatar";
export default function Navigation() {
  return (
    <>
      <nav className="flex w-full items-center justify-between gap-4 p-4 shadow">
        <Link href="/">Home</Link>
        <Link href="/user">
          <Avatar className="w-10 h-10" />
        </Link>
      </nav>
    </>
  );
}
