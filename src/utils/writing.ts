import type { CollectionEntry } from 'astro:content';

/**
 * Returns the path segments (without leading /writing/) for a writing post.
 * Uses the frontmatter slug if provided, otherwise generates from date and id.
 */
export function getPostSlug(entry: CollectionEntry<'writing'>): string {
  if (entry.data.slug) {
    return entry.data.slug.replace(/^\//, '');
  }
  const d = entry.data.date;
  const year = d.getFullYear().toString();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const name = entry.id.replace(/\/index\.mdx?$/, '').replace(/^\d{4}-\d{2}-\d{2}---/, '');
  return `${year}/${month}/${day}/${name}`;
}

/**
 * Returns the full URL path (e.g. /writing/2022/11/12/my-post) for a writing post.
 */
export function getPostUrl(entry: CollectionEntry<'writing'>): string {
  return `/writing/${getPostSlug(entry)}`;
}
