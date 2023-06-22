import { reference, z } from "astro:content";

const markdownPageSchema = z
  .object({
    layout: z.string().optional().default("../PageLayout.astro"),
    tags: z.array(z.string()).optional(),
  })
  .strict();

// Schema: https://schema.org/ImageObject
const imageSchema = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    contentUrl: z.string(),
    datePublished: z.string().optional(),
    author: z.string().optional(),
    contentLocation: z.string().optional(),
  })
  .strict();

// Schema: https://schema.org/Thing
const thingSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    url: z.string().optional(),
    identifier: z.string(),
    image: imageSchema.optional(),
    sameAs: z.string().optional(),
  })
  .strict();

// Schema: https://schema.org/CreativeWork
const creativeWorkSchema = thingSchema.extend({
  author: z.string().optional(),
  headline: z.string().optional(),
  dateCreated: z.date(),
  dateModified: z.date().optional(),
  datePublished: z.date().optional(),
  isPartOf: z.string().optional(),
  inLanguage: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  license: z.string().optional(),
  translationOfWork: z.array(reference('article')).optional(),
});

// Schema: https://schema.org/Article
const articleSchema = creativeWorkSchema.extend({}).strict();

// Schema: https://schema.org/WebPage
const webPageSchema = creativeWorkSchema.extend({}).strict();

// Schema:
const answerSchema = thingSchema.extend({});

// Schema: https://schema.org/Question
export const questionSchema = creativeWorkSchema.extend({
  upvoteCount: z.number().optional(),
  answerCount: z.number().optional(),
  acceptedAnswer: answerSchema,
  suggestedAnswer: answerSchema,
});

export const articlePageSchema = markdownPageSchema.merge(articleSchema);
export const pageSchema = markdownPageSchema.merge(webPageSchema);

export type ArticleFrontmatter = z.infer<typeof articlePageSchema>;
export type PageFrontmatter = z.infer<typeof pageSchema>;
export type QuestionFrontmatter = z.infer<typeof questionSchema>;
