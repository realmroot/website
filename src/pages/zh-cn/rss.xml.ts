import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog'))
    .filter((post) => post.data.language === 'zh-CN')
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

  return rss({
    title: 'Realmroot 博客',
    description: '让每个 API 都能为 Agent 所用：关于 Agent 工具平面与信任基础的文章。',
    site: context.site ?? 'https://realmroot.dev',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/zh-cn/blog/${post.id.replace(/^zh-cn\//, '')}/`,
    })),
  });
}
