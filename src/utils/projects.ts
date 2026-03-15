import type { CollectionEntry } from 'astro:content';

/**
 * Returns the full URL path (e.g. /projects/bluetooth-classic) for a project.
 * Uses the frontmatter slug if provided, otherwise generates from the entry id.
 */
export function getProjectUrl(entry: CollectionEntry<'projects'>): string {
  if (entry.data.slug) {
    return entry.data.slug.startsWith('/') ? entry.data.slug : `/${entry.data.slug}`;
  }
  return `/projects/${entry.id.replace(/\/index\.mdx?$/, '')}`;
}
