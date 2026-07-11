import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export interface VectorArticle {
  slug: string;
  fileName: string;
  title: string;
  subtitle: string;
  description: string;
  order: number;
}

export const vectorSeries = {
  slug: "xin-xing-xiang-liang-dong-li-xue",
  title: "心行向量动力学",
  subtitle: "Mind-Action Vector Dynamics",
  description:
    "用向量模型重构“心”“行”与“世界”的关系：从第一性原理、跨学科同构、多体复杂系统，到可执行的 Mind-OS 实践。",
  href: "/series/xin-xing-xiang-liang-dong-li-xue/",
};

export const vectorArticles: VectorArticle[] = [
  {
    slug: "intro",
    fileName: "引言：心行向量动力学.html",
    title: "引言：心行向量动力学",
    subtitle: "第一性原理下的认知重构与系统实践",
    description: "从王阳明知行合一、禅宗、马克思实践论出发，提出心向量与行向量的基础模型。",
    order: 1,
  },
  {
    slug: "system-foundation",
    fileName: "第一章：系统基底.html",
    title: "第一章：系统基底",
    subtitle: "定义“心”与“行”的二维坐标",
    description: "建立心向量、行向量、夹角、内耗与心流的基础坐标系。",
    order: 2,
  },
  {
    slug: "interdisciplinary-isomorphism",
    fileName: "第二章：跨学科同构.html",
    title: "第二章：跨学科同构",
    subtitle: "打通先哲的终极密码",
    description: "把阳明心学、禅宗、马克思实践论、自由能原理放回同一个结构里看。",
    order: 3,
  },
  {
    slug: "multi-agent-complex-system",
    fileName: "第三章：多体博弈与复杂系统.html",
    title: "第三章：多体博弈与复杂系统",
    subtitle: "从单体走向真实世界",
    description: "讨论向量劫持、系统重置、多体干涉，以及人在关系网络中的真实运动。",
    order: 4,
  },
  {
    slug: "practice-and-conclusion",
    fileName: "第四章：落地实践与结语.html",
    title: "第四章：落地实践与结语",
    subtitle: "重构生命的控制论算法与系统造物",
    description: "把理论转化为每日可执行的 Mind-OS：观心、练心、以性施行、杠杆造物。",
    order: 5,
  },
];

export function getVectorArticle(slug: string) {
  return vectorArticles.find((article) => article.slug === slug);
}

export function getVectorArticleHtml(article: VectorArticle) {
  const sourcePath = resolve(process.cwd(), "..", "心行向量动力学", article.fileName);
  const source = readFileSync(sourcePath, "utf8").replace(/\r\n/g, "\n");
  const match = source.match(/<article[^>]*>([\s\S]*?)<\/article>/i);

  return match ? match[1].trim() : "";
}

export function getVectorArticleScripts(article: VectorArticle) {
  const sourcePath = resolve(process.cwd(), "..", "心行向量动力学", article.fileName);
  const source = readFileSync(sourcePath, "utf8").replace(/\r\n/g, "\n");
  const scripts = Array.from(source.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi))
    .map((match) => match[1].trim())
    .filter(Boolean)
    .filter((script) => !script.includes("window.MathJax"));

  return scripts.join("\n\n");
}

export function getVectorArticleHeadings(article: VectorArticle) {
  const html = getVectorArticleHtml(article);
  return Array.from(html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi))
    .map((match) => match[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim())
    .filter(Boolean);
}
