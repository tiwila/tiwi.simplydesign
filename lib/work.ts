import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

type CaseStudySectionMap = {
  problem: string;
  whyMoment: string;
  whatIDid: string;
  whatBroke: string;
  outcome: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  description: string;
  role: string;
  context: string;
  timeline: string;
  brief: string;
  tags: string[];
  toolStack?: string[];
  liveSiteUrl?: string;
  phase1Body?: string;
  phase1Challenge?: string;
  phase2Body?: string;
  phase2Roadblock?: string;
  phase3Body?: string;
  sections: CaseStudySectionMap;
  decisions: Array<{ label: string; body: string }>;
  year: string;
  disciplines: string[];
  summary: string;
  coverImage?: string;
  featured?: boolean;
  relatedSlug?: string;
  metrics?: Array<{ value: string; label: string }>;
  images?: Array<{ src: string; alt: string }>;
  hoverTeaser?: string;
  accentColor?: "terracotta" | "sage" | "warm-yellow" | "default";
  prototypeUrl?: string;
  lofiPrototypeUrl?: string;
  finalPrototypeUrl?: string;
  userJourneyImage?: string;
  staticImages?: Array<{ src: string; alt: string; caption?: string }>;
  heroImage?: string;
  lofiGifImage?: string;
  lofiGifCaption?: string;
  journeyCaption?: string;
  usabilityWorked?: string;
  usabilityDidnt?: string;
  usabilityBeforeImage?: string;
  usabilityAfterImage?: string;
  usabilityFindingsImage?: string;
  highFidelityImage?: string;
  highFidelityCtaUrl?: string;
};

const WORK_DIR = path.join(process.cwd(), "content", "work");

function mdxToSlug(filename: string) {
  return filename.replace(/\.mdx$/i, "");
}

function coerceStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string") return [value];
  return [];
}

function parseSections(content: string): CaseStudySectionMap {
  const chunks = content
    .split(/\n##\s+/)
    .map((s, idx) => (idx === 0 ? s.replace(/^##\s+/, "") : s))
    .filter(Boolean);
  const map: Record<string, string> = {};

  for (const chunk of chunks) {
    const [headingLine, ...rest] = chunk.split("\n");
    if (!headingLine) continue;
    map[headingLine.trim().toLowerCase()] = rest.join("\n").trim();
  }

  return {
    problem: map["the problem"] ?? "",
    whyMoment: map["the why moment"] ?? "",
    whatIDid: map["what i did"] ?? "",
    whatBroke: map["what broke"] ?? "",
    outcome: map["the outcome"] ?? ""
  };
}

function parseDecisions(whatIDid: string): Array<{ label: string; body: string }> {
  if (!whatIDid.trim()) return [];
  const matches = Array.from(whatIDid.matchAll(/(?:^|\n)###\s+([^\n]+)\n([\s\S]*?)(?=\n###\s+|$)/g));
  if (!matches.length) return [];
  return matches.slice(0, 3).map((m) => ({
    label: m[1].trim(),
    body: m[2].trim()
  }));
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  const files = await fs.readdir(WORK_DIR);
  const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

  const studies = await Promise.all(
    mdxFiles.map(async (filename) => {
      const slug = mdxToSlug(filename);
      return await getCaseStudy(slug);
    })
  );

  return studies.sort((a, b) => Number(b.year) - Number(a.year));
}

export async function getCaseStudy(slug: string): Promise<CaseStudy> {
  const fullPath = path.join(WORK_DIR, `${slug}.mdx`);
  const raw = await fs.readFile(fullPath, "utf8");
  const parsed = matter(raw);
  const data = parsed.data as Record<string, unknown>;
  const sections = parseSections(parsed.content);
  const tags = coerceStringArray(data.tags);
  const timeline = String(data.timeline ?? "");
  const yearMatch = timeline.match(/\b(20\d{2})\b/);

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    role: String(data.role ?? ""),
    context: String(data.context ?? ""),
    timeline,
    brief: String(data.brief ?? ""),
    tags,
    toolStack: coerceStringArray(data.toolStack),
    liveSiteUrl:
      typeof data.liveSiteUrl === "string" && data.liveSiteUrl.trim().length > 0
        ? data.liveSiteUrl
        : undefined,
    phase1Body: typeof data.phase1Body === "string" ? data.phase1Body : undefined,
    phase1Challenge: typeof data.phase1Challenge === "string" ? data.phase1Challenge : undefined,
    phase2Body: typeof data.phase2Body === "string" ? data.phase2Body : undefined,
    phase2Roadblock: typeof data.phase2Roadblock === "string" ? data.phase2Roadblock : undefined,
    phase3Body: typeof data.phase3Body === "string" ? data.phase3Body : undefined,
    sections,
    decisions: parseDecisions(sections.whatIDid),
    year: yearMatch ? yearMatch[1] : "",
    disciplines: tags,
    summary: String(data.description ?? ""),
    coverImage: typeof data.coverImage === "string" ? data.coverImage : undefined,
    featured: Boolean(data.featured ?? false),
    relatedSlug: typeof data.relatedSlug === "string" ? data.relatedSlug : undefined,
    metrics: Array.isArray(data.metrics)
      ? (data.metrics as Array<{ value?: unknown; label?: unknown }>).map((m) => ({
          value: String(m?.value ?? ""),
          label: String(m?.label ?? "")
        }))
      : undefined,
    images: Array.isArray(data.images)
      ? (data.images as Array<{ src?: unknown; alt?: unknown }>).map((img) => ({
          src: String(img?.src ?? ""),
          alt: String(img?.alt ?? "")
        }))
      : undefined,
    hoverTeaser: typeof data.hoverTeaser === "string" ? data.hoverTeaser : undefined,
    prototypeUrl:
      typeof data.prototypeUrl === "string" && data.prototypeUrl.trim().length > 0
        ? data.prototypeUrl
        : undefined,
    lofiPrototypeUrl:
      typeof data.lofiPrototypeUrl === "string" && data.lofiPrototypeUrl.trim().length > 0
        ? data.lofiPrototypeUrl
        : undefined,
    finalPrototypeUrl:
      typeof data.finalPrototypeUrl === "string" && data.finalPrototypeUrl.trim().length > 0
        ? data.finalPrototypeUrl
        : undefined,
    userJourneyImage:
      typeof data.userJourneyImage === "string" && data.userJourneyImage.trim().length > 0
        ? data.userJourneyImage
        : undefined,
    staticImages: Array.isArray(data.staticImages)
      ? (data.staticImages as Array<{ src?: unknown; alt?: unknown; caption?: unknown }>).map((img) => ({
          src: String(img?.src ?? ""),
          alt: String(img?.alt ?? ""),
          caption: typeof img?.caption === "string" ? img.caption : undefined
        }))
      : undefined,
    heroImage: typeof data.heroImage === "string" ? data.heroImage : undefined,
    lofiGifImage: typeof data.lofiGifImage === "string" ? data.lofiGifImage : undefined,
    lofiGifCaption: typeof data.lofiGifCaption === "string" ? data.lofiGifCaption : undefined,
    journeyCaption: typeof data.journeyCaption === "string" ? data.journeyCaption : undefined,
    usabilityWorked: typeof data.usabilityWorked === "string" ? data.usabilityWorked : undefined,
    usabilityDidnt: typeof data.usabilityDidnt === "string" ? data.usabilityDidnt : undefined,
    usabilityBeforeImage: typeof data.usabilityBeforeImage === "string" ? data.usabilityBeforeImage : undefined,
    usabilityAfterImage: typeof data.usabilityAfterImage === "string" ? data.usabilityAfterImage : undefined,
    usabilityFindingsImage:
      typeof data.usabilityFindingsImage === "string" ? data.usabilityFindingsImage : undefined,
    highFidelityImage: typeof data.highFidelityImage === "string" ? data.highFidelityImage : undefined,
    highFidelityCtaUrl: typeof data.highFidelityCtaUrl === "string" ? data.highFidelityCtaUrl : undefined,
    accentColor:
      data.accentColor === "terracotta" ||
      data.accentColor === "sage" ||
      data.accentColor === "warm-yellow" ||
      data.accentColor === "default"
        ? data.accentColor
        : "default"
  };
}

