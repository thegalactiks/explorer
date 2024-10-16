import { documentTypes } from '@galactiks/contentlayer';
import { z } from 'zod';

const metadataHeaders = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    canonical: z.string().optional(),
    alternates: z
      .array(
        z.object({
          href: z.string(),
          hreflang: z.string(),
        })
      )
      .optional(),
    robots: z.string().optional(),
    openGraph: z
      .array(
        z.object({
          prefix: z.string().optional(),
          property: z.string(),
          content: z.string(),
        })
      )
      .optional(),
    facebook: z
      .array(
        z.object({
          property: z.string(),
          content: z.string(),
        })
      )
      .optional(),
    twitterCard: z
      .array(
        z.object({
          name: z.string(),
          content: z.string(),
        })
      )
      .optional(),
    structuredDataSchemas: z.array(z.object({})).optional(),
  })
  .strict();

const galactiksSchema = z
  .object({
    type: z.enum(Object.keys(documentTypes) as [keyof typeof documentTypes]),
    tags: z.array(z.string()).optional(),
    listingPage: z.boolean().default(false),
    path: z.string(),
    slug: z.string().optional(),
    headers: metadataHeaders.optional(),
  })
  .strict();

const idSchema = z
  .object({
    '@id': z.string(),
  })
  .strict();

// Schema: https://schema.org/Thing
const thingSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    url: z.string().optional(),
    identifier: z.string(),
    image: z
      .object({
        name: z.string().optional(),
        description: z.string().optional(),
        contentUrl: z.string(),
        datePublished: z.string().optional(),
        author: z.string().optional(),
        contentLocation: z.string().optional(),
      })
      .optional(),
    sameAs: z.string().optional(),
  })
  .strict();

// Schema: https://schema.org/ItemList
const itemListSchema = thingSchema.extend({
  itemListElement: z.array(
    z.object({
      position: z.number(),
      name: z.string(),
      item: z.string(),
    })
  ),
});

// Schema: https://schema.org/PostalAddress
export const postalAddressSchema = thingSchema.extend({
  addressCountry: z.string(),
  addressLocality: z.string().optional(),
  addressRegion: z.string().optional(),
  postOfficeBoxNumber: z.string().optional(),
  postalCode: z.string().optional(),
  streetAddress: z.string().optional(),
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

// Schema: https://schema.org/Place
export const placeSchema = thingSchema.extend({
  address: postalAddressSchema.optional(),
  latitude: z.string().or(z.number()).optional(),
  longitude: z.string().or(z.number()).optional(),
  keywords: z.array(z.string()).optional(),
  telephone: z.string().optional(),
});

// Schema: https://schema.org/CreativeWork
const creativeWorkSchema = thingSchema.extend({
  url: z.string(),
  author: personSchema.optional(),
  headline: z.string().optional(),
  dateCreated: z.date(),
  dateModified: z.date(),
  datePublished: z.date(),
  isPartOf: z.string().optional(),
  inLanguage: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  license: z.string().optional(),
  position: z.number().optional(),
  translationOfWork: idSchema.optional(),
  workTranslation: idSchema.optional(),
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
const articleSchema = creativeWorkSchema
  .extend({
    articleBody: z.string().optional(),
    wordCount: z.number().optional(),
  })
  .strict();

// Schema: https://schema.org/WebPage
const webPageSchema = creativeWorkSchema
  .extend({
    breadcrumb: itemListSchema.optional(),
    relatedLink: z.string().optional(),
  })
  .strict();

// Schema:
const answerSchema = thingSchema.extend({});

// Schema: https://schema.org/Question
export const questionSchema = creativeWorkSchema.extend({
  upvoteCount: z.number().optional(),
  answerCount: z.number().optional(),
  acceptedAnswer: answerSchema,
  suggestedAnswer: answerSchema,
});

export const articlePageSchema = galactiksSchema.merge(articleSchema);
export const pageSchema = galactiksSchema.merge(webPageSchema);

export type MetadataHeaders = z.infer<typeof metadataHeaders>;
export type ItemList = z.infer<typeof itemListSchema>;
export type Person = z.infer<typeof personSchema>;
export type Place = z.infer<typeof placeSchema>;
export type Organization = z.infer<typeof organizationSchema>;
export type Article = z.infer<typeof articlePageSchema>;
export type Page = z.infer<typeof pageSchema>;
