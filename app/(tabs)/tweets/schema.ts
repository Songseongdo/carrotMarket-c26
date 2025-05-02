import { z } from 'zod';

export const uploadSchema = z.object({
  filename: z.string(),
  contentType: z.string(),
});

export const tweetSchema = z.object({
  reply: z.string(),
  url: z.string().optional(),
});

export type TweetType = z.infer<typeof tweetSchema>;
