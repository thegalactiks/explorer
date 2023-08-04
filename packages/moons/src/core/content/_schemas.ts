import { z } from 'zod'

const metadataHeaders = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  canonical: z.string().optional(),
  alternates: z.array(z.object({
    href: z.string(),
    hreflang: z.string(),
  })).optional(),
  robots: z.string().optional(),
  openGraph: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    url: z.string().optional(),
  }).optional(),
}).strict();
const moonsSchema = z.object({
  collection: z.enum(['pages', 'articles']).or(z.string()),
  tags: z.array(z.string()).optional(),
  slug: z.string(),
  headers: metadataHeaders.optional(),
}).strict()

// Schema: https://schema.org/Thing
const thingSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    url: z.string().optional(),
    identifier: z.string(),
    image: z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      contentUrl: z.string(),
      datePublished: z.string().optional(),
      author: z.string().optional(),
      contentLocation: z.string().optional(),
    }).optional(),
    sameAs: z.string().optional(),
  })
  .strict();

// Schema: https://schema.org/ItemList
const itemListSchema = thingSchema.extend({
  itemListElement: z.array(z.object({
    position: z.number(),
    name: z.string(),
    item: z.string(),
  })),
});

// Schema: https://schema.org/Person
export const personSchema = thingSchema.extend({
  additionalName: z.string().optional(),
  email: z.string().optional(),
  familyName: z.string().optional(),
  givenName: z.string().optional(),
  jobTitle: z.string().optional(),
  telephone: z.string().optional(),
});

// Schema: https://schema.org/CreativeWork
const creativeWorkSchema = thingSchema.extend({
  author: z.string().or(personSchema).optional(),
  headline: z.string().optional(),
  dateCreated: z.date(),
  dateModified: z.date().optional(),
  datePublished: z.date().optional(),
  isPartOf: z.string().optional(),
  inLanguage: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  license: z.string().optional(),
  position: z.number().optional(),
  translationOfWork: z.string().or(z.array(z.object({
    inLanguage: z.string(),
    url: z.string(),
  }))).optional(),
});

// Schema: https://schema.org/Event
export const eventSchema = thingSchema.extend({
  endDate: z.date().optional(),
  inLanguage: z.string().optional(),
  startDate: z.date().optional(),
  keywords: z.array(z.string()).optional(),
});

// Schema: https://schema.org/QuantitativeValue
const quantitativeValueSchema = thingSchema.extend({
  maxValue: z.number().optional(),
  minValue: z.number().optional(),
  value: z.number(),
});

// Schema: https://schema.org/MediaObject
const mediaObjectSchema = creativeWorkSchema.extend({
  height: quantitativeValueSchema.optional(),
  uploadDate: z.date().optional(),
  width: quantitativeValueSchema.optional(),
});

const propertyValueSchema = thingSchema.extend({
  value: z.string(),
});

// Schema: https://schema.org/ImageObject
const imageObjectSchema = mediaObjectSchema.extend({
  caption: mediaObjectSchema.or(z.string()).optional(),
  exifData: z.array(propertyValueSchema).optional(),
});

// Schema: https://schema.org/Organization
export const organizationSchema = thingSchema.extend({
  email: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  legalName: z.string().optional(),
  logo: imageObjectSchema.or(z.string()).optional(),
  slogan: z.string().optional(),
  taxID: z.string().optional(),
  telephone: z.string().optional(),
  vatID: z.string().optional(),
});

// Schema: https://schema.org/Article
const articleSchema = creativeWorkSchema.extend({
  articleBody: z.string().optional(),
  wordCount: z.number().optional(),
}).strict();

// Schema: https://schema.org/WebPage
const webPageSchema = creativeWorkSchema.extend({
  breadcrumb: itemListSchema.optional(),
  relatedLink: z.string().optional()
}).strict();

// Schema:
const answerSchema = thingSchema.extend({});

// Schema: https://schema.org/Question
export const questionSchema = creativeWorkSchema.extend({
  upvoteCount: z.number().optional(),
  answerCount: z.number().optional(),
  acceptedAnswer: answerSchema,
  suggestedAnswer: answerSchema,
});

export const articlePageSchema = moonsSchema.merge(articleSchema);
export const pageSchema = moonsSchema.merge(webPageSchema);

export type MetadataHeaders = z.infer<typeof metadataHeaders>;
export type Article = z.infer<typeof articlePageSchema>;
export type Page = z.infer<typeof pageSchema>;
