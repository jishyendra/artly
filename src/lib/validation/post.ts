import { z } from "zod";
export const postSchema = z.object({
  body: z.string(),
  urls: z.array(z.string().url({ message: "Please enter a valid URL" })),
});

export type PostFormValues = z.infer<typeof postSchema>;
