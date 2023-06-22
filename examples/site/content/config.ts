import { defineCollection } from "astro:content";
import { articlePageSchema, pageSchema, questionSchema } from "./_schemas";

const articlesCollection = defineCollection({
  schema: articlePageSchema,
});

const pagesCollection = defineCollection({
  schema: pageSchema,
});

const questionsCollection = defineCollection({
  schema: questionSchema,
});

export const collections = {
  article: articlesCollection,
  question: questionsCollection,
  page: pagesCollection,
};
