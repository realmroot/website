import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog'))
    .filter((post) => post.data.language === 'en')
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

  return rss({
    title: 'Realmroot Blog',
    description: 'Every API, Agent-ready. Notes on the Agent tool plane and its trust foundation.',
    site: context.site ?? 'https://realmroot.dev',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/blog/${post.id.replace(/^en\//, '')}/`,
    })),
  });
}
