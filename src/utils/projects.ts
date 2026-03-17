import type { CollectionEntry } from 'astro:content';

/**
 * Returns the slug segment for a project (e.g. "bluetooth-classic").
 * Uses the frontmatter slug if provided, otherwise derives it from the entry id.
 */
export function getProjectSlug(entry: CollectionEntry<'projects'>): string {
  return entry.data.slug ?? entry.id.replace(/\/index\.mdx?$/, '');
}

/**
 * Returns the full URL path (e.g. /projects/bluetooth-classic) for a project.
 * Uses the frontmatter slug if provided, otherwise generates from the entry id.
 */
export function getProjectUrl(entry: CollectionEntry<'projects'>): string {
  const slug = getProjectSlug(entry);
  return slug.startsWith('/') ? slug : `/projects/${slug}`;
}
