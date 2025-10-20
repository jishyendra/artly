import { z } from "zod";
const SourceEnum = z.enum(
  ["x", "youtube", "instagram", "pinterest", "facebook", "tiktok", "twitch"],
  { message: "Enter valid source from the list" },
);

export const urlSchema = z.object({
  url: z.string().url({ message: "Enter a valid URL" }),
  source: SourceEnum,
});

export const postSchema = z.object({
  body: z.string(),
  urls: z.array(urlSchema),
});

export type UrlValues = z.infer<typeof urlSchema>;
export type SourceValues = z.infer<typeof SourceEnum>;
export type PostFormValues = z.infer<typeof postSchema>;
