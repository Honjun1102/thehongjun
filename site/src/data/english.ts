export interface EnglishEssayBlock {
  type: "heading" | "paragraph";
  text: string;
}

export interface EnglishEssay {
  slug: string;
  title: string;
  description: string;
  category: string;
  featured: boolean;
  order: number;
  publishedAt: string;
  blocks: EnglishEssayBlock[];
}

export const englishSiteMeta = {
  title: "Hong Jun",
  subtitle: "Personal Sovereignty in the Age of AI",
  description:
    "A writer's home about how an ordinary person reclaims sovereignty in the age of AI: first by seeing the larger explanations clearly, then by rebuilding body, thought, and livelihood.",
};

export const englishNavItems = [
  { label: "Home", href: "/en" },
  { label: "Essays", href: "/en/essays" },
  { label: "About", href: "/en/about" },
  { label: "Start Here", href: "/en/start-here" },
  { label: "Subscribe", href: "/en/subscribe/" },
  { label: "Support", href: "/en/support/" },
] as const;

export const englishPillars = [
  {
    title: "Body",
    body:
      "The body is not a tool. It is the first layer of sovereignty. If the body collapses, thought floats and willpower thins out.",
  },
  {
    title: "Mind",
    body:
      "Most people do not lack information. They lack a framework that can explain the world, history, and their own position inside it.",
  },
  {
    title: "Livelihood",
    body:
      "Without independent livelihood, freedom of mind is fragile. If your survival is fully outsourced, your judgment is easy to purchase.",
  },
] as const;

export const englishAboutSections = [
  {
    title: "Why This Site Exists",
    body:
      "I am not trying to build a content feed. I am trying to build an entrance back to the human being itself. This site exists for people who feel that something has gone wrong in the way modern life captures attention, weakens the body, and turns work into dependence.",
  },
  {
    title: "What I Write About",
    body:
      "I write about body, thought, livelihood, trust, history, Laozi, Chinese thought, AI, and the practical reconstruction of personal sovereignty. But these are not parallel topics. Body and thought are the roots. Livelihood is the moat that protects them in reality. Trust and cooperation are the mechanisms that amplify what one person alone cannot do. The wider explanations of age, system, and history tell us what structure we are actually living inside.",
  },
  {
    title: "How The Four Foundations Fit Together",
    body:
      "The four foundational essays are not parallel opinions. They form a trunk. Personal Sovereignty defines the main problem. AI Is Fire, Laozi Is Water explains why the age itself burns people out. Reflections on Historical Cycles widens the scale and explains why systems become heavy, slow, and self-consuming. The People's View of History and the Great Man View of History pushes further down and asks who actually moves history. Together they restore coordinates first: what age you are living in, what historical line you stand inside, and what base is actually beneath your feet.",
  },
  {
    title: "Who This Is For",
    body:
      "This is for readers who are educated enough to feel the fracture, ambitious enough to reject numbness, and honest enough to admit that modern life is making them thinner, weaker, and more dependent than they want to be.",
  },
] as const;

export const englishStartHere = [
  {
    slug: "personal-sovereignty",
    title: "One Person’s Sovereignty: How Not to Be Erased by Algorithms",
    role: "Main Problem",
    why:
      "Start here with the main problem: why an ordinary person slowly becomes unlike himself.",
  },
  {
    slug: "ai-is-fire-laozi-is-water",
    title: "AI Is Fire, Laozi Is Water",
    role: "Age Diagnosis",
    why:
      "Read this next to understand the age itself: why attention, rhythm, and inner order are under pressure.",
  },
  {
    slug: "thoughts-on-historical-cycles",
    title: "Reflections on Historical Cycles",
    role: "System Logic",
    why:
      "Then widen the scale and understand why systems grow heavy, slow, rigid, and eventually begin to rot.",
  },
  {
    slug: "people-and-heroes",
    title: "The People’s View of History and the Great Man View of History",
    role: "Historical Subject",
    why:
      "End here by asking who actually drives history, and what lies beneath heroes.",
  },
] as const;

export { englishEssays } from "./englishEssays";
