"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Avatar({ className }: { className?: string }) {
  return (
    <Image
      src="/images/image.png"
      alt="default avatar"
      className={cn("aspect-square rounded", className)}
      height={40}
      width={40}
    />
  );
}
