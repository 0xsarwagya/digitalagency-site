// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
var posts = defineCollection({
  name: "posts",
  directory: "content/posts",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    author: z.string(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    featured: z.boolean().optional().default(false)
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return {
      ...document,
      mdx,
      slug: document._meta.path,
      url: `/blog/${document._meta.path}`
    };
  }
});
var content_collections_default = defineConfig({
  collections: [posts]
});
export {
  content_collections_default as default
};
