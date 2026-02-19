import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getConfigFile } from '../utils/config';

export async function GET(context: APIContext) {
  const config = await getConfigFile();

  const rssConfig = (config.integrations as any)?.rss;
  if (!rssConfig?.enabled) {
    return new Response(null, { status: 404 });
  }

  const siteUrl = config.metadata?.url || context.site?.toString() || 'https://docs.example.com';
  const title = rssConfig.title || config.metadata?.name || 'Documentation';
  const description = rssConfig.description || config.metadata?.description || 'Documentation feed';
  const limit = rssConfig.limit || 50;

  // Derive feed items from sidebar navigation
  const items: { title: string; link: string; description: string }[] = [];
  const sidebar = config.navigation?.sidebar || [];

  for (const group of sidebar) {
    if (!group.items) continue;
    for (const item of group.items) {
      const href = item.href || item.slug;
      if (!href) continue;
      items.push({
        title: item.label,
        link: new URL(href, siteUrl).toString(),
        description: `${group.label} - ${item.label}`,
      });
      if (items.length >= limit) break;
    }
    if (items.length >= limit) break;
  }

  return rss({
    title,
    description,
    site: siteUrl,
    items: items.map(item => ({
      title: item.title,
      link: item.link,
      description: item.description,
    })),
  });
}
