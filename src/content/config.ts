import { defineCollection, z } from 'astro:content';

const writing = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.coerce.date(),
      tags: z.array(z.string()).optional().default([]),
      draft: z.boolean().optional().default(false),
      slug: z.string().optional(),
      featureImage: image().optional(),
    }),
});

const projects = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      order: z.number().optional().default(99),
      draft: z.boolean().optional().default(false),
      slug: z.string().optional(),
      featureImage: image().optional(),
      github: z.string().optional(),
      website: z.string().optional(),
    }),
});

const timeline = defineCollection({
  type: 'content',
  schema: z.object({
    type: z.string().optional(),
    category: z.string().optional(),
    title: z.string(),
    subtitle: z.string().optional(),
    website: z.string().nullable().optional(),
    twitter: z.string().nullable().optional(),
    date: z.coerce.date(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { writing, projects, timeline };
