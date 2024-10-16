import { z } from 'zod';

export const openGraphConfigSchema = z.object({
  siteName: z.string().optional(),
});

export const facebookConfigSchema = z.object({
  appId: z.string().optional(),
});

export const twitterConfigSchema = z.object({
  creator: z.string().optional(),
  site: z.string().optional(),
});
