import { essays } from "./essays";
import { englishEssays } from "./english";

export function getEnglishSlugFromChinese(chineseSlug: string) {
  const chineseEssay = essays.find((essay) => essay.slug === chineseSlug);
  if (!chineseEssay) return undefined;

  return englishEssays.find((essay) => essay.order === chineseEssay.order)?.slug;
}

export function getChineseSlugFromEnglish(englishSlug: string) {
  const englishEssay = englishEssays.find((essay) => essay.slug === englishSlug);
  if (!englishEssay) return undefined;

  return essays.find((essay) => essay.order === englishEssay.order)?.slug;
}
