import { defineCollection, z } from "astro:content";

const essays = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.string(),
    order: z.number().default(99),
    featured: z.boolean().default(false),
    category: z.enum(["身体", "思想", "生计"]),
  }),
});

export const collections = {
  essays,
};
