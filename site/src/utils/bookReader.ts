export type HeadingBlock = {
  type: "h1" | "h2" | "h3";
  text: string;
  id: string;
};

export type ParagraphBlock = {
  type: "p";
  html: string;
};

export type ListBlock = {
  type: "ul" | "ol";
  items: string[];
};

export type Block = HeadingBlock | ParagraphBlock | ListBlock;

export type HeadingMeta = {
  label?: string;
  chapter: number;
  isPreface?: boolean;
};

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatInline(text: string) {
  return escapeHtml(text)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

export function parseMarkdown(md: string): Block[] {
  const lines = md.split("\n");
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let ul: string[] = [];
  let ol: string[] = [];
  let headingIndex = 0;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push({
      type: "p",
      html: paragraph.map((line) => formatInline(line)).join("<br />"),
    });
    paragraph = [];
  };

  const flushUl = () => {
    if (!ul.length) return;
    blocks.push({ type: "ul", items: ul.map((item) => formatInline(item)) });
    ul = [];
  };

  const flushOl = () => {
    if (!ol.length) return;
    blocks.push({ type: "ol", items: ol.map((item) => formatInline(item)) });
    ol = [];
  };

  const flushAll = () => {
    flushParagraph();
    flushUl();
    flushOl();
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    if (!trimmed) {
      flushAll();
      continue;
    }

    const heading = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushAll();
      const level = heading[1].length;
      const type = `h${level}` as "h1" | "h2" | "h3";
      headingIndex += 1;
      blocks.push({
        type,
        text: heading[2],
        id: `section-${headingIndex}`,
      });
      continue;
    }

    const unordered = trimmed.match(/^- (.+)$/);
    if (unordered) {
      flushParagraph();
      flushOl();
      ul.push(unordered[1]);
      continue;
    }

    const ordered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (ordered) {
      flushParagraph();
      flushUl();
      ol.push(ordered[1]);
      continue;
    }

    flushUl();
    flushOl();
    paragraph.push(trimmed);
  }

  flushAll();
  return blocks;
}

export function buildHeadingMeta(
  blocks: Block[],
  isPrefaceHeading: (text: string) => boolean,
) {
  const headingMeta = new Map<string, HeadingMeta>();
  let chapterIndex = 0;
  let sectionIndex = 0;

  for (const block of blocks) {
    if (block.type === "h1") {
      sectionIndex = 0;
      if (isPrefaceHeading(block.text)) {
        headingMeta.set(block.id, {
          label: "序言",
          chapter: 0,
          isPreface: true,
        });
      } else {
        chapterIndex += 1;
        headingMeta.set(block.id, {
          label: `第 ${chapterIndex} 章`,
          chapter: chapterIndex,
        });
      }
    }

    if (block.type === "h2") {
      if (chapterIndex > 0) {
        sectionIndex += 1;
        headingMeta.set(block.id, {
          label: `${chapterIndex}.${sectionIndex}`,
          chapter: chapterIndex,
        });
      } else {
        headingMeta.set(block.id, {
          chapter: 0,
          isPreface: true,
        });
      }
    }
  }

  return headingMeta;
}
