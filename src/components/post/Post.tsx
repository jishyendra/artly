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
import { Card, CardContent } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { UrlValues, type SourceValues } from "@/lib/validation/post";
import Avatar from "../Avatar";
import { Button } from "../ui/button";
import Link from "next/link";

type PostProps = {
  body: string;
  author: string;
  createdAt: Date;
  likedBy?: number;
  urls?: UrlValues[];
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
  const itemCount = urls?.length;

  return (
    <div key={postId} className="p-1">
      <div className="flex items-center justify-between gap-4">
        <Link href="#">
          <div className="space-between flex flex-grow items-center text-sm">
            <Avatar />
            <div>{`@${author.substring(0, 8)}`}</div>
          </div>
        </Link>
        <div>
          <Button>Follow</Button>
        </div>
      </div>
      <div className="ml-2">
        <hr></hr>
        <div>{body}</div>
        {/* <div
          className={cn(
            "mx-auto w-full items-center justify-center overflow-hidden rounded-xl border *:w-full *:object-cover",
            // "sm:",
            itemCount === 1 &&
              "inset-0 pb-[56.25%] *:absolute *:inset-0 *:h-full sm:relative",
            itemCount === 2 && "grid h-80 grid-cols-2 gap-px *:h-full",
            itemCount === 3 &&
              "grid h-80 grid-cols-2 gap-px *:h-40 *:first:row-span-2 *:first:h-full",
            itemCount === 4 &&
              "grid h-80 grid-cols-2 grid-rows-2 gap-px *:h-40",
          )}
        > */}
        <div>
          <Carousel className="Carousel relative">
            <CarouselContent className="Carousel-Content">
              {urls?.map((url, key) => {
                return (
                  <CarouselItem className="Carousel-Item" key={key}>
                    <Card className="Card">
                      <CardContent className="Card-Item p-0! h-full! flex aspect-square w-full items-center justify-center">
                        <EmbedPost
                          source={url.source}
                          className="EmbedPost w-full"
                          url={url.url}
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2" />
            <CarouselNext className="absolute right-0 top-1/2" />
          </Carousel>
        </div>
      </div>
      <hr></hr>
      <div className="text-sm">{`${new Date(createdAt).toLocaleString()}`}</div>
      <PostControls />
      {/* </div> */}
    </div>
  );
}

export function EmbedPost({
  source,
  url,
  className,
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
        <XEmbed height={height} width={width} className={className} url={url} />
      );
    case "youtube":
      return (
        <YouTubeEmbed
          height={height}
          width={width}
          className={className}
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
          className={className}
        />
      );
    case "facebook":
      return (
        <FacebookEmbed
          url={url}
          height={height}
          width={width}
          className={className}
        />
      );
    case "tiktok":
      return (
        <TikTokEmbed
          height={height}
          width={width}
          url={url}
          className={className}
        />
      );
    default:
      return null;
  }
}
