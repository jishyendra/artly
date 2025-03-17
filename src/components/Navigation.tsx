"use client";
import Link from "next/link";
import Avatar from "./Avatar";
export default function Navigation() {
  return (
    <>
      <nav className="flex items-center justify-between gap-4 p-4 shadow">
        <Link href="/">Home</Link>
        <Link href="/user">
          Account
          <Avatar className="mx-1 inline" />
        </Link>
      </nav>
    </>
  );
}
