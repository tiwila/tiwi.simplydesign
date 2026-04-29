import { DictionaryHero } from "@/components/DictionaryHero";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import Link from "next/link";
import { getAllCaseStudies } from "@/lib/work";

export default async function HomePage() {
  const all = await getAllCaseStudies();
  const featured = all.filter((c) => c.featured).slice(0, 3);

  return (
    <div className="space-y-[80px]">
      <DictionaryHero />

      <section>
        <div className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-ink-muted">
          selected work
        </div>
        <div className="mt-6 space-y-4">
          {featured.map((c) => (
            <CaseStudyCard
              key={c.slug}
              href={`/work/${c.slug}`}
              title={c.title}
              summary={c.summary}
              year={c.year}
              disciplines={c.disciplines}
              coverImage={c.coverImage}
              hoverTeaser={c.hoverTeaser}
              accentColor={c.accentColor}
            />
          ))}
        </div>
        <div className="mt-6">
          <Link href="/work" className="font-sans text-[14px] text-accent">
            View all work →
          </Link>
        </div>
      </section>
    </div>
  );
}

