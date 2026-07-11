const LOCKED_PHRASES = [
  "内在秩序",
  "那条线",
  "这套写作",
  "总纲读完",
  "总纲说明白",
  "真正关系",
  "共同体与合作",
  "共同体",
  "精神自由",
  "独立生计",
  "身体主权",
  "历史周期律",
  "人民史观",
  "英雄史观",
  "时代方向",
  "一个普通人",
  "把自己",
  "从这里开始",
  "真正稀缺",
  "继续往下走",
  "先读这篇",
  "继续走进来",
  "更稳秩序",
  "清晰的线",
  "生命的主人",
].sort((a, b) => b.length - a.length);

function escapeHtml(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function lockPhrases(text: string) {
  let html = escapeHtml(text);

  for (const phrase of LOCKED_PHRASES) {
    const escapedPhrase = escapeHtml(phrase);
    const pattern = new RegExp(escapeRegExp(escapedPhrase), "g");
    html = html.replace(
      pattern,
      `<span class="keep-phrase">${escapedPhrase}</span>`,
    );
  }

  if (!html.endsWith("</span>")) {
    html = html.replace(
      /([\u4e00-\u9fff]{2,4}[。！？；：]?)(\s*)$/,
      `<span class="keep-phrase">$1</span>$2`,
    );
  }

  return html;
}
