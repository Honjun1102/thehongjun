import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { essays } from "../data/essays";
import { siteMeta } from "../data/site";

export function GET(context: APIContext) {
  const items = [...essays]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .map((essay) => ({
      title: essay.title,
      description: essay.description,
      pubDate: new Date(essay.publishedAt),
      link: `/essays/${essay.slug}/`,
    }));

  return rss({
    title: `${siteMeta.title} Essays`,
    description: siteMeta.description,
    site: context.site ?? "https://www.thehongjun.com",
    items,
    customData: `<language>zh-CN</language>`,
  });
}
