"use client";
import PostControls from "./PostControls";
import { cn } from "@/lib/utils";
import {
  XEmbed,
  YouTubeEmbed,
  InstagramEmbed,
  PinterestEmbed,
  FacebookEmbed,
  TikTokEmbed,
} from "react-social-media-embed";

import { UrlValues, type SourceValues } from "@/lib/validation/post";
import Avatar from "../Avatar";
import { Button } from "../ui/button";
import Link from "next/link";

type PostProps = {
  body: string;
  author: string;
  createdAt: Date;
  likedBy?: number;
  urls: UrlValues[];
  postId: string;
};

export default function Post({
  body,
  author,
  createdAt,
  likedBy,
  urls,
  postId,
}: PostProps) {
  const itemCount = urls.length;

  return (
    <div className="grid gap-2 rounded-md border p-2">
      <div className="flex flex-nowrap justify-between gap-4">
        <Link href="#">
          <div className="flex w-full items-center gap-2 text-sm">
            <Avatar />
            <div>{`@${author}`}</div>
          </div>
        </Link>
        <div>
          <Button>Follow</Button>
        </div>
      </div>
      <div key={postId} className="ml-2">
        <hr></hr>
        <div>{body}</div>
        <div
          className={cn(
            "mx-auto w-full items-center justify-center overflow-hidden rounded-xl border *:w-full *:object-cover",
            // "sm:",
            itemCount === 1 &&
              "relative inset-0 pb-[56.25%] *:absolute *:inset-0 *:h-full",
            itemCount === 2 && "grid h-80 grid-cols-2 gap-px *:h-full",
            itemCount === 3 &&
              "grid h-80 grid-cols-2 gap-px *:h-40 *:first:row-span-2 *:first:h-full",
            itemCount === 4 &&
              "grid h-80 grid-cols-2 grid-rows-2 gap-px *:h-40",
          )}
        >
          {urls.map((url, key) => {
            return (
              <>
                <EmbedPost
                  key={key}
                  width={"100%"}
                  height={"100%"}
                  source={url.source}
                  url={url.url}
                />
              </>
            );
          })}
        </div>
        <hr></hr>
        <div className="text-sm">{`${new Date(createdAt).toLocaleString()}`}</div>
        <PostControls />
      </div>
    </div>
  );
}

export function EmbedPost({
  source,
  url,
  // className,
  width,
  height,
}: {
  source: SourceValues;
  url: string;
  className?: string;
  width?: string | number;
  height?: string | number;
}) {
  switch (source) {
    case "x":
      return (
        <XEmbed
          height={height}
          width={width}
          // className={className}
          url={url}
        />
      );
    case "youtube":
      return (
        <YouTubeEmbed
          height={height}
          width={width}
          // className={className}
          url={url}
        />
      );
    case "instagram":
      return <InstagramEmbed url={url} height={height} width={width} />;
    case "pinterest":
      return (
        <PinterestEmbed
          url={url}
          height={height}
          width={width}
          // className={className}
        />
      );
    case "facebook":
      return (
        <FacebookEmbed
          url={url}
          height={height}
          width={width}
          // className={className}
        />
      );
    case "tiktok":
      return (
        <TikTokEmbed
          height={height}
          width={width}
          url={url}
          // className={className}
        />
      );
    default:
      return null;
  }
}
