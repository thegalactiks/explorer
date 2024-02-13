import { z } from 'zod';

const plausibleConfigSchema = z.object({
  domain: z.string(),
  src: z.string().optional(),
});
export type PlausibleConfig = z.infer<typeof plausibleConfigSchema>;

export const analyticsConfigSchema = z.object({
  service: z.enum(['plausible']),
  config: plausibleConfigSchema,
});
