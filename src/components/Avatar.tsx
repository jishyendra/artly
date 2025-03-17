"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Avatar({ className }: { className?: string }) {
  return (
    <Image
      src="/images/image.png"
      alt="default avatar"
      className={cn("aspect-square max-h-14 rounded", className)}
      width={40}
      height={40}
    />
  );
}
