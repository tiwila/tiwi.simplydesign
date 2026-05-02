import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CaseStudyContext } from "@/components/CaseStudyContext";
import { CaseStudyOutcome } from "@/components/CaseStudyOutcome";
import { CaseStudySection } from "@/components/CaseStudySection";
import { PullQuote } from "@/components/PullQuote";
import { WhyMoment } from "@/components/WhyMoment";
import { FigmaEmbed } from "@/components/FigmaEmbed";
import { getAllCaseStudies, getCaseStudy } from "@/lib/work";

export async function generateStaticParams() {
  const all = await getAllCaseStudies();
  return all.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (slug === "moro-app-redesign") {
    return {
      title: "Moro App — Tiwi Lanre-Adisa",
      description: "A three-stage journey bridging the gap between design freedom and technical performance."
    };
  }

  return {};
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let cs;
  try {
    cs = await getCaseStudy(slug);
  } catch {
    notFound();
  }

  const related =
    cs.relatedSlug && cs.relatedSlug !== cs.slug ? await safeGetCaseStudy(cs.relatedSlug) : null;
  const isTheraLink = cs.slug === "theralink-teletherapy-platform";
  const isMosm = cs.slug === "mosm-origin-designathon";
  const isMidnightRun = cs.slug === "midnight-run-cafe-research";
  const accentTextClass =
    cs.accentColor === "terracotta"
      ? "text-terracotta"
      : cs.accentColor === "sage"
        ? "text-sage"
        : cs.accentColor === "warm-yellow"
          ? "text-warm-yellow"
          : "text-accent";

  const headerTextClass =
    "text-ink";

  const ctaTextClass =
    cs.accentColor === "terracotta"
      ? "text-terracotta"
      : cs.accentColor === "sage"
        ? "text-sage"
        : "text-accent";
  const metricColorClass =
    cs.accentColor === "terracotta" ? "text-terracotta" : isTheraLink ? "text-sage" : "text-accent";
  const whyMomentAccent =
    cs.accentColor === "terracotta" ? "terracotta" : isTheraLink ? "sage" : "accent";

  if (isMidnightRun) {
    const deckUrl = cs.slideDeckUrl ?? "/decks/midnight-run-research-deck.pdf";

    return (
      <article className="space-y-12">
        <div className="flex items-center justify-between gap-4">
          <Link href="/work" className="font-sans text-[13px] font-medium text-ink-muted hover:text-ink">
            ← Work
          </Link>
          <a
            href={deckUrl}
            target="_blank"
            rel="noreferrer"
            className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-accent underline decoration-dotted underline-offset-[3px]"
            style={{ textDecorationThickness: "0.5px" }}
          >
            Open research deck (PDF) →
          </a>
        </div>

        <header className="space-y-5">
          <div className="space-y-2">
            <h1 className="font-serif text-[48px] font-bold leading-[1.08] text-ink">{cs.title}</h1>
            <div className="font-serif text-[20px] italic leading-[1.4] text-ink-muted">{cs.description}</div>
          </div>

          <div className={`flex flex-wrap items-baseline gap-x-2 gap-y-2 font-sans text-[11px] font-medium uppercase tracking-[0.1em] ${accentTextClass}`}>
            {cs.tags.map((tag, idx) => (
              <span key={tag} className="inline-flex items-center gap-2">
                <span>{tag}</span>
                {idx < cs.tags.length - 1 ? <span className="text-ink-muted">·</span> : null}
              </span>
            ))}
          </div>
        </header>

        {cs.heroImage ? (
          <div className="relative w-full overflow-hidden rounded-sm bg-bg">
            <div className="relative aspect-[16/8]">
              <Image src={cs.heroImage} alt={`${cs.title} hero`} fill className="object-contain p-2" />
            </div>
          </div>
        ) : null}

        <hr />

        <CaseStudyContext role={cs.role} context={cs.context} timeline={cs.timeline} brief={cs.brief} />

        <section className="space-y-6">
          <h2 className="font-serif text-[28px] leading-[1.2] text-ink">The research problem</h2>
          <div className="space-y-3 font-sans text-[16px] leading-[1.7] text-ink">
            <p>Midnight Run is a strong local brand with a weak digital front door. The site didn’t help people decide whether to visit.</p>
            <ul className="ml-5 list-disc space-y-1 text-ink-muted">
              <li>Menu and pricing were hard to find (or mislabeled).</li>
              <li>Hours weren’t surfaced at the decision point.</li>
              <li>The site didn’t communicate “study-friendly” signals (Wi‑Fi, outlets, noise, seating).</li>
            </ul>
            <div className="rounded-sm border border-rule bg-cream-deep/35 px-5 py-4">
              <div className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-ink-muted">research question</div>
              <div className="mt-2 font-serif text-[18px] leading-[1.6] text-ink">
                What usability and information gaps prevent the website from supporting visit decision‑making — and what design changes would address them?
              </div>
            </div>
          </div>
        </section>

        <WhyMoment accentColor="sage">{cs.sections.whyMoment}</WhyMoment>

        <section className="space-y-6">
          <h2 className="font-serif text-[28px] leading-[1.2] text-ink">Research plan</h2>
          <div className="space-y-3 font-sans text-[16px] leading-[1.7] text-ink">
            <p>
              We didn’t rely on a single method. The plan was multi-method on purpose — so patterns that appeared across
              expert review and real user behavior could be treated as findings, not opinions.
            </p>
            <p className="text-ink-muted">
              The artifacts below (journey map + usability metrics) are included because they show the same story from
              different angles: uncertainty compounds when the website can’t confirm basic visit decisions.
            </p>
          </div>

          <InlineImage
            src="/images/mrc-user-journey-map.png"
            alt="User journey map for Jordan Morales"
            caption="User journey map: uncertainty compounds across awareness → consideration → acquisition."
            aspect="16/8"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <MethodCard
              title="Heuristic evaluation"
              subtitle="Nielsen’s 10 heuristics"
              bullets={[
                "Find violations early (before user testing).",
                "Turn issues into testable hypotheses for sessions."
              ]}
            />
            <MethodCard
              title="User surveys"
              subtitle="Quantitative feedback"
              bullets={[
                "Identify trends and common expectations quickly.",
                "Add numbers to support interview themes."
              ]}
            />
            <MethodCard
              title="User interviews"
              subtitle="Decision-making context"
              bullets={[
                "Understand why people choose a café before they arrive.",
                "Validate what information reduces uncertainty fastest."
              ]}
            />
            <MethodCard
              title="Usability testing"
              subtitle="4 participants · 7 tasks"
              bullets={[
                "Observe real failures (menu, hours, search, suitability).",
                "Quantify breakdowns so fixes are non-negotiable."
              ]}
            />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-serif text-[28px] leading-[1.2] text-ink">Competitive analysis findings</h2>
          <div className="grid gap-4 md:grid-cols-[1fr_280px] md:items-start">
            <div className="space-y-3 font-sans text-[16px] leading-[1.7] text-ink">
              <p>
                We benchmarked Midnight Run against two well-performing local venues — Abe Erb Brewing and Eclipse Cafe —
                to ground recommendations in real market expectations (not just preference).
              </p>
              <ul className="ml-5 list-disc space-y-1 text-ink-muted">
                <li>
                  <span className="text-ink">Eclipse Cafe:</span> structured, categorized menu that helps users decide before arriving.
                </li>
                <li>
                  <span className="text-ink">Abe Erb:</span> events are visible and discoverable (calendar-style), supporting planning.
                </li>
                <li>
                  <span className="text-ink">Both:</span> clear navigation labels and key info reachable in one click.
                </li>
              </ul>
              <p className="text-ink-muted">
                The gap wasn’t about visual design. It was information architecture: Midnight Run had the vibe — but not the structure.
              </p>
            </div>
            <InlineImage
              src="/images/mrc-competitive-analysis.png"
              alt="Competitive analysis reference brands: Abe Erb and Eclipse Cafe"
              caption="Competitive benchmarks used to set expectations."
            />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-serif text-[28px] leading-[1.2] text-ink">Heuristic evaluation (3 severe violations)</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <FindingCard
              title="Visibility of system status"
              detail="Products page showed “0 products” with no explanation."
            />
            <FindingCard
              title="Match with the real world"
              detail="Search behaved like e‑commerce, not a café (irrelevant results)."
            />
            <FindingCard
              title="Lack of content & clarity"
              detail="Homepage relied on a single image and didn’t surface essentials like menu, hours, or offerings."
            />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <InlineImage
              src="/images/mrc-0-products.png"
              alt="Products page shows 0 products with no explanation"
              caption="Visibility of system status: “0 products” with no explanation."
            />
            <InlineImage
              src="/images/mrc-mismatch.png"
              alt="Search results mismatch for café-related terms"
              caption="Match with the real world: search behaves like e‑commerce, not a café."
            />
            <InlineImage
              src="/images/mrc-heuristic-homepage.png"
              alt="Homepage shows a single image and newsletter signup"
              caption="Lack of content & clarity: clean design, but missing key info to make a decision."
            />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-serif text-[28px] leading-[1.2] text-ink">Usability testing — key insights</h2>
          <div className="space-y-3 font-sans text-[16px] leading-[1.7] text-ink">
            <p>
              We ran task-based usability testing with 4 participants across 7 visit-decisions. The data made the story hard to ignore:
              5 out of 7 tasks had a 0% success rate, and even the tasks people completed were described as effortful.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <InsightCard
              title="People couldn’t confirm basics"
              detail="Menu, hours, and “is this a good study spot?” weren’t answerable quickly — which stalled the visit decision."
              stat="0% success on key tasks"
            />
            <InsightCard
              title="Search didn’t match intent"
              detail="Search results behaved like product shopping, not café discovery — creating confusion instead of reassurance."
              stat="Highest errors on search"
            />
            <InsightCard
              title="Uncertainty compounds"
              detail="Every stage (awareness → consideration → acquisition) introduced more doubt, leading to abandonment instead of commitment."
              stat="Journey map pattern"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <InlineImage
              src="/images/mrc-usability-task-success.png"
              alt="Usability task success rates table"
              caption="Task success rates across 7 visit-decisions."
              aspect="16/9"
            />
            <InlineImage
              src="/images/mrc-usability-error-rate.png"
              alt="Usability error rate table"
              caption="Error rates by task (including severity)."
              aspect="16/9"
            />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-serif text-[28px] leading-[1.2] text-ink">Design recommendations</h2>
          <div className="grid gap-4 lg:grid-cols-3">
            <InsightToRec
              insight="Improve content clarity"
              rec={[
                "Rename “Products” → “Menu” to match expectations.",
                "Add clear menu, hours, and café offerings above the fold.",
                "Include events + study/work information."
              ]}
            />
            <InsightToRec
              insight="Improve navigation & structure"
              rec={[
                "Simplify navigation with clear labels.",
                "Reduce reliance on scrolling (above-the-fold mentality).",
                "Improve page hierarchy and organization."
              ]}
            />
            <InsightToRec
              insight="Improve feedback & user confidence"
              rec={[
                "Add empty states like “Coming soon” for blank pages.",
                "Provide feedback for search results and navigation actions.",
                "Improve perceived completeness to build trust."
              ]}
            />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <section className="space-y-3 rounded-sm border border-rule bg-cream-deep/35 px-6 py-6">
            <div className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-ink-muted">
              what broke
            </div>
            <ul className="ml-5 list-disc space-y-2 font-sans text-[16px] leading-[1.7] text-ink">
              <li>
                Participant diversity: most participants were students. A second round with non‑student users would strengthen generalizability.
              </li>
              <li>
                Competitive timing: doing competitive analysis in parallel with the heuristic review would have exposed the “Products vs Menu” issue earlier.
              </li>
            </ul>
          </section>

          <section className="space-y-3 rounded-sm border border-rule bg-accent-light/35 px-6 py-6">
            <div className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-ink-muted">
              what’s next
            </div>
            <div className="space-y-2 font-sans text-[16px] leading-[1.7] text-ink">
              <p>
                We’re designing the redesign based on these recommendations with the intent to pitch it directly to Midnight Run Cafe.
              </p>
              <p className="text-ink-muted">
                If accepted, this becomes a live implementation case study — and this page will be updated.
              </p>
            </div>
          </section>
        </section>

        <hr />
        <div className="flex flex-wrap items-center justify-between gap-4">
          {related ? (
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-2 font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-ink-muted">
              <span>See also:</span>
              <Link
                href={`/work/${related.slug}`}
                className={`${ctaTextClass} underline decoration-dotted underline-offset-[3px]`}
                style={{ textDecorationThickness: "0.5px" }}
              >
                {related.title}
              </Link>
            </div>
          ) : (
            <div />
          )}
          <Link href="/work" className={`font-sans text-[11px] font-medium uppercase tracking-[0.1em] ${ctaTextClass}`}>
            All work →
          </Link>
        </div>
      </article>
    );
  }

  if (cs.slug === "moro-app-redesign") {
    const phaseLabelTextClass = "text-accent";

    return (
      <article className="space-y-12">
        <div>
          <Link href="/work" className="font-sans text-[13px] font-medium text-ink-muted hover:text-ink">
            ← Work
          </Link>
        </div>

        <header className="space-y-3">
          <h1 className={`font-serif text-[48px] font-bold leading-[1.08] ${headerTextClass}`}>{cs.title}</h1>
          <div className="font-serif text-[20px] italic leading-[1.4] text-ink-muted">{cs.description}</div>
          {cs.toolStack?.length ? (
            <div className="flex flex-wrap gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-accent">
              {cs.toolStack.map((tool) => (
                <span
                  key={tool}
                  className="rounded-sm border border-rule bg-cream-deep/35 px-2 py-1 text-accent"
                >
                  {tool}
                </span>
              ))}
            </div>
          ) : null}
          <div
            className={`flex flex-wrap items-baseline gap-x-2 gap-y-2 font-sans text-[11px] font-medium uppercase tracking-[0.1em] ${
              cs.slug === "moro-app-redesign" ? "text-accent" : accentTextClass
            }`}
          >
            {cs.tags.map((tag, idx) => (
              <span key={tag} className="inline-flex items-center gap-2">
                <span>{tag}</span>
                {idx < cs.tags.length - 1 ? <span className="text-ink-muted">·</span> : null}
              </span>
            ))}
          </div>
        </header>

        {cs.heroImage ? (
          <div className="relative w-full overflow-hidden rounded-sm bg-bg">
            <div className="relative aspect-[16/9]">
              <Image src={cs.heroImage} alt={`${cs.title} hero`} fill className="object-contain p-2" />
            </div>
          </div>
        ) : null}
        <hr />

        <CaseStudyContext role={cs.role} context={cs.context} timeline={cs.timeline} brief={cs.brief} />

        <CaseStudySection beat="problem">
          <p>{cs.sections.problem}</p>
        </CaseStudySection>

        <PhaseSection
          accentTextClass={phaseLabelTextClass}
          label="Phase 01"
          title="Strategic UX Redesign (Figma)"
        >
          <p>{cs.phase1Body}</p>

          <div className="grid gap-6 pt-2 md:grid-cols-2">
            <LabeledFigmaEmbed
              label="Before"
              figmaUrl="https://www.figma.com/design/DnNbOusJAraq1V2Z7reHCf/Moro-Website-Redesign?node-id=0-1&t=H4hfR2KDs8FBxWsy-1"
              title="Legacy Moro App layout (before) — Figma"
            />
            <LabeledFigmaEmbed
              label="After"
              figmaUrl="https://www.figma.com/design/DnNbOusJAraq1V2Z7reHCf/Moro-Website-Redesign?node-id=2-12&t=H4hfR2KDs8FBxWsy-1"
              title="Redesigned Moro App layout (after) — Figma"
            />
          </div>

          {cs.phase1Challenge ? <InlineNote prefix="The Challenge:" text={cs.phase1Challenge} /> : null}
        </PhaseSection>

        <hr />

        <PhaseSection
          accentTextClass={phaseLabelTextClass}
          label="Phase 02"
          title="Handoff & Accessibility (Canva)"
        >
          <p>{cs.phase2Body}</p>

          <figure className="my-6 space-y-2">
            <div className="relative w-full overflow-hidden rounded-sm bg-bg">
              <div className="relative aspect-[16/9]">
                <Image
                  src="https://tiwila.github.io/simplydivine.github.io/assets/morocanva.png"
                  alt="Canva website builder handoff"
                  fill
                  className="object-contain p-2"
                  unoptimized
                />
              </div>
            </div>
          </figure>

          {cs.phase2Roadblock ? <InlineNote prefix="The Roadblock:" text={cs.phase2Roadblock} /> : null}
        </PhaseSection>

        <WhyMoment accentColor={whyMomentAccent}>{cs.sections.whyMoment}</WhyMoment>

        <PhaseSection
          accentTextClass={phaseLabelTextClass}
          label="Phase 03"
          title="The Code-Based Pivot (Lovable)"
        >
          <p>{cs.phase3Body}</p>

          <figure className="my-6 space-y-2">
            <div className="relative w-full overflow-hidden rounded-sm bg-bg">
              <div className="relative aspect-[16/9]">
                <Image
                  src="https://tiwila.github.io/simplydivine.github.io/assets/morofinal.png"
                  alt="Final Moro App implementation"
                  fill
                  className="object-contain p-2"
                  unoptimized
                />
              </div>
            </div>
          </figure>
        </PhaseSection>

        <CaseStudySection beat="broke">
          <p>{cs.sections.whatBroke}</p>
        </CaseStudySection>

        <CaseStudyOutcome paragraph={cs.sections.outcome} metrics={cs.metrics ?? []} metricColorClass={metricColorClass} />

        <hr />
        <div className="flex flex-wrap items-center justify-between gap-4">
          {related ? (
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-2 font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-ink-muted">
              <span>See also:</span>
              <Link
                href={`/work/${related.slug}`}
                className={`${ctaTextClass} underline decoration-dotted underline-offset-[3px]`}
                style={{ textDecorationThickness: "0.5px" }}
              >
                {related.title}
              </Link>
            </div>
          ) : (
            <div />
          )}
          <Link href="/work" className={`font-sans text-[11px] font-medium uppercase tracking-[0.1em] ${ctaTextClass}`}>
            All work →
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="space-y-12">
      <div>
        <Link href="/work" className="font-sans text-[13px] font-medium text-ink-muted hover:text-ink">
          ← Work
        </Link>
      </div>

      <header className="space-y-3">
        <h1 className={`font-serif text-[48px] font-bold leading-[1.08] ${headerTextClass}`}>{cs.title}</h1>
        <div className="font-serif text-[20px] italic leading-[1.4] text-ink-muted">{cs.description}</div>
        {cs.toolStack?.length ? (
          <div className="flex flex-wrap gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-ink-muted">
            {cs.toolStack.map((tool) => (
              <span
                key={tool}
                className="rounded-sm border border-rule bg-cream-deep/35 px-2 py-1 text-ink-muted"
              >
                {tool}
              </span>
            ))}
          </div>
        ) : null}
        <div
          className={`flex flex-wrap items-baseline gap-x-2 gap-y-2 font-sans text-[11px] font-medium uppercase tracking-[0.1em] ${
            isTheraLink ? "text-sage" : accentTextClass
          }`}
        >
          {cs.tags.map((tag, idx) => (
            <span key={tag} className="inline-flex items-center gap-2">
              <span>{tag}</span>
              {idx < cs.tags.length - 1 ? <span className="text-ink-muted">·</span> : null}
            </span>
          ))}
        </div>
        {cs.liveSiteUrl ? (
          <div>
            <a
              href={cs.liveSiteUrl}
              target="_blank"
              rel="noreferrer"
              className={`inline-block font-sans text-[12px] font-medium uppercase tracking-[0.1em] ${ctaTextClass}`}
            >
              Visit Live Site ↗
            </a>
          </div>
        ) : null}
      </header>
      {cs.heroImage ? (
        <div className="relative w-full overflow-hidden rounded-sm bg-bg">
          <div className="relative aspect-[16/9]">
            <Image src={cs.heroImage} alt={`${cs.title} hero`} fill className="object-contain p-2" unoptimized />
          </div>
        </div>
      ) : null}
      <hr />

      <CaseStudyContext role={cs.role} context={cs.context} timeline={cs.timeline} brief={cs.brief} />

      <CaseStudySection beat="problem">
        <p>{cs.sections.problem.split("\n\n")[0]}</p>
        {cs.sections.problem.split("\n\n")[1] ? <p className="mt-3">{cs.sections.problem.split("\n\n")[1]}</p> : null}
        {isTheraLink ? (
          <PullQuote
            quote="I spent two weeks researching therapists and still just picked one randomly. I didn't know what I was supposed to be looking for."
            source="User interview, June 2025"
          />
        ) : null}
      </CaseStudySection>

      <WhyMoment accentColor={whyMomentAccent}>{cs.sections.whyMoment}</WhyMoment>

      {isTheraLink && cs.userJourneyImage ? (
        <section className="space-y-3">
          <div className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-sage">
            user journey map
          </div>
          <p className="font-sans text-[16px] leading-[1.7] text-ink">
            To ground the redesign in real behavior, I mapped the full emotional journey from
            first awareness to post-session reflection. The biggest confidence drops happened during
            therapist search and booking, which became the priority moments for trust, clarity, and
            guided decision support.
          </p>
          <figure className="space-y-2">
            <div className="relative w-full overflow-hidden rounded-sm bg-bg">
              <div className="relative aspect-[16/9]">
                <Image src={cs.userJourneyImage} alt="User journey map" fill className="object-contain" unoptimized />
              </div>
            </div>
            <figcaption className="font-sans text-[12px] text-ink-muted">
              {cs.journeyCaption ?? "User journey map from awareness to ongoing engagement."}
            </figcaption>
          </figure>
        </section>
      ) : null}

      <CaseStudySection beat="process">
        <div className="space-y-6">
          {cs.decisions.slice(0, 3).map((decision, idx) => (
            <div
              key={decision.label}
              className="rounded-sm border border-rule bg-cream-deep/35 px-5 py-5 shadow-[0_4px_12px_rgba(28,26,23,0.04)]"
            >
              <div className="mb-2 font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-ink-muted">
                decision {idx + 1}
              </div>
              <h3 className="font-sans text-[15px] font-semibold text-ink">{decision.label}</h3>
              <p>{decision.body}</p>

              {isMosm && idx === 0 ? (
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <figure className="space-y-2">
                    <div className="relative overflow-hidden rounded-sm bg-bg">
                      <div className="relative aspect-[16/10]">
                        <Image
                          src="/images/mosm-brand-positioning.png"
                          alt="MOSM brand positioning"
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                    </div>
                    <figcaption className="font-sans text-[12px] italic text-ink-muted">
                      Brand positioning
                    </figcaption>
                  </figure>

                  <figure className="space-y-2">
                    <div className="relative overflow-hidden rounded-sm bg-bg">
                      <div className="relative aspect-[16/10]">
                        <Image
                          src="/images/mosm-brand-pillars.png"
                          alt="MOSM brand pillars"
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                    </div>
                    <figcaption className="font-sans text-[12px] italic text-ink-muted">
                      Brand pillars
                    </figcaption>
                  </figure>
                </div>
              ) : null}

              {isMosm && idx === 1 ? (
                <figure className="mt-5 space-y-2">
                  <div className="relative overflow-hidden rounded-sm bg-bg">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src="/images/mosm-logo-concepts.png"
                        alt="MOSM logo concepts"
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  </div>
                  <figcaption className="font-sans text-[12px] italic text-ink-muted">
                    Logo concepts explored
                  </figcaption>
                </figure>
              ) : null}
            </div>
          ))}

          {cs.lofiPrototypeUrl ? (
            <div className="space-y-2">
              <h3 className="font-sans text-[14px] font-semibold text-ink">Lo-Fi Prototype</h3>
              <FigmaEmbed
                embedSrc={toFigmaEmbedUrl(cs.lofiPrototypeUrl)}
                openUrl={cs.lofiPrototypeUrl}
                title={`${cs.title} Lo-Fi Figma prototype`}
                label="Load lo-fi prototype"
                aspect="16/10"
              />
              <figcaption className="font-sans text-[12px] italic text-ink-muted">
                Lo-fi prototype — guided matching flow, round 1 testing
              </figcaption>
            </div>
          ) : null}
        </div>
      </CaseStudySection>

      {isTheraLink ? (
        <section className="space-y-6">
          <div className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-sage">
            usability findings
          </div>
          {cs.usabilityFindingsImage ? (
            <figure className="space-y-2">
              <div className="relative w-full overflow-hidden rounded-sm bg-bg">
                <div className="relative aspect-[16/8]">
                  <Image src={cs.usabilityFindingsImage} alt="Usability study findings" fill className="object-contain" unoptimized />
                </div>
              </div>
              <figcaption className="font-sans text-[12px] text-ink-muted">
                Usability study findings summary from testing.
              </figcaption>
            </figure>
          ) : null}
          {(cs.usabilityBeforeImage || cs.usabilityAfterImage) ? (
            <div className="space-y-3">
              <div className="font-sans text-[12px] font-medium uppercase tracking-[0.1em] text-ink-muted">
                refining design
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {cs.usabilityBeforeImage ? (
                  <figure className="space-y-2">
                    <div className="relative overflow-hidden rounded-sm bg-bg">
                      <div className="relative aspect-[16/10]">
                        <Image src={cs.usabilityBeforeImage} alt="Before usability testing" fill className="object-contain p-2" unoptimized />
                      </div>
                    </div>
                    <figcaption className="font-sans text-[12px] italic text-ink-muted">
                      Before usability testing
                    </figcaption>
                  </figure>
                ) : null}
                {cs.usabilityAfterImage ? (
                  <figure className="space-y-2">
                    <div className="relative overflow-hidden rounded-sm bg-bg">
                      <div className="relative aspect-[16/10]">
                        <Image src={cs.usabilityAfterImage} alt="After usability testing" fill className="object-contain p-2" unoptimized />
                      </div>
                    </div>
                    <figcaption className="font-sans text-[12px] italic text-ink-muted">
                      After usability testing
                    </figcaption>
                  </figure>
                ) : null}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      {!isTheraLink && (cs.prototypeUrl || cs.finalPrototypeUrl) ? (
        <CaseStudySection beat="visuals">
          <div className="space-y-3">
            <p>Explore the final interactive prototype directly in this case study.</p>
            {cs.finalPrototypeUrl || cs.prototypeUrl ? (
              <FigmaEmbed
                embedSrc={toFigmaEmbedUrl(cs.finalPrototypeUrl ?? cs.prototypeUrl ?? "")}
                openUrl={cs.finalPrototypeUrl ?? cs.prototypeUrl ?? ""}
                title={`${cs.title} Final Figma prototype`}
                label="Load prototype"
                aspect="16/10"
              />
            ) : null}
            {cs.finalPrototypeUrl || cs.prototypeUrl ? (
              <a
                href={cs.finalPrototypeUrl ?? cs.prototypeUrl}
                target="_blank"
                rel="noreferrer"
                className={`inline-block font-sans text-[12px] font-medium uppercase tracking-[0.1em] ${ctaTextClass}`}
              >
                Open full prototype in Figma →
              </a>
            ) : null}
          </div>
        </CaseStudySection>
      ) : null}

      {cs.slideDeckUrl ? (
        <CaseStudySection beat="visuals">
          <div className="space-y-3">
            <p>You can also explore the slide deck used to present the system.</p>
            <a
              href={cs.slideDeckUrl}
              target="_blank"
              rel="noreferrer"
              className={`inline-block font-sans text-[12px] font-medium uppercase tracking-[0.1em] ${ctaTextClass}`}
            >
              Open slide deck (PDF) →
            </a>
          </div>
        </CaseStudySection>
      ) : null}

      <CaseStudySection beat="broke">
        <p>{cs.sections.whatBroke}</p>
      </CaseStudySection>

      {isTheraLink && (cs.finalPrototypeUrl || cs.highFidelityCtaUrl) ? (
        <section className="space-y-4">
          <div className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-sage">
            high fidelity designs
          </div>
          <figure className="space-y-3">
            <FigmaEmbed
              embedSrc={toFigmaEmbedUrl(cs.finalPrototypeUrl ?? cs.highFidelityCtaUrl ?? "")}
              openUrl={cs.highFidelityCtaUrl ?? cs.finalPrototypeUrl ?? ""}
              title={`${cs.title} High-Fidelity Figma prototype`}
              label="Load hi-fi prototype"
              aspect="16/10"
            />
            {cs.finalPrototypeUrl || cs.highFidelityCtaUrl ? (
              <a
                href={cs.highFidelityCtaUrl ?? cs.finalPrototypeUrl}
                target="_blank"
                rel="noreferrer"
                className={`inline-block rounded-sm border-[1.5px] ${
                  cs.accentColor === "sage"
                    ? "border-sage"
                    : cs.accentColor === "terracotta"
                      ? "border-terracotta"
                      : "border-accent"
                } px-5 py-[10px] font-sans text-[13px] font-medium uppercase tracking-[0.05em] ${ctaTextClass} transition-colors duration-200 ease-in-out hover:bg-accent-light`}
              >
                View Interactive Prototype →
              </a>
            ) : null}
          </figure>
        </section>
      ) : null}

      <CaseStudyOutcome
        paragraph={cs.sections.outcome}
        metrics={cs.metrics ?? []}
        metricColorClass={metricColorClass}
      />

      <hr />
      <div className="flex flex-wrap items-center justify-between gap-4">
        {related ? (
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-2 font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-ink-muted">
            <span>See also:</span>
            <Link
              href={`/work/${related.slug}`}
              className={`${ctaTextClass} underline decoration-dotted underline-offset-[3px]`}
              style={{ textDecorationThickness: "0.5px" }}
            >
              {related.title}
            </Link>
          </div>
        ) : (
          <div />
        )}
        <Link href="/work" className={`font-sans text-[11px] font-medium uppercase tracking-[0.1em] ${ctaTextClass}`}>
          All work →
        </Link>
      </div>
    </article>
  );
}

async function safeGetCaseStudy(slug: string) {
  try {
    return await getCaseStudy(slug);
  } catch {
    return null;
  }
}

function toFigmaEmbedUrl(url: string) {
  if (url.includes("figma.com/embed?")) return url;
  return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-rule bg-bg px-4 py-3">
      <div className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-ink-muted">{label}</div>
      <div className="mt-1 font-sans text-[14px] leading-[1.5] text-ink">{value}</div>
    </div>
  );
}

function MethodCard({
  title,
  subtitle,
  bullets,
  children
}: {
  title: string;
  subtitle: string;
  bullets: string[];
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-sm border border-rule bg-bg px-5 py-5">
      <div className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-ink-muted">{subtitle}</div>
      <div className="mt-2 font-serif text-[20px] leading-[1.2] text-ink">{title}</div>
      <ul className="mt-3 ml-5 list-disc space-y-1 font-sans text-[15px] leading-[1.65] text-ink-muted">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      {children}
    </div>
  );
}

function FindingCard({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-sm border border-rule bg-cream-deep/35 px-5 py-5">
      <div className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-ink-muted">violation</div>
      <div className="mt-2 font-sans text-[15px] font-semibold text-ink">{title}</div>
      <div className="mt-2 font-sans text-[15px] leading-[1.65] text-ink-muted">{detail}</div>
    </div>
  );
}

function InsightToRec({ insight, rec }: { insight: string; rec: string[] }) {
  return (
    <div className="rounded-sm border border-rule bg-bg px-5 py-5">
      <div className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-ink-muted">insight</div>
      <div className="mt-2 font-serif text-[18px] leading-[1.55] text-ink">{insight}</div>
      <div className="mt-4 font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-ink-muted">
        recommendation
      </div>
      <ul className="mt-2 ml-5 list-disc space-y-1 font-sans text-[15px] leading-[1.65] text-ink-muted">
        {rec.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </div>
  );
}

function InsightCard({ title, detail, stat }: { title: string; detail: string; stat?: string }) {
  return (
    <div className="rounded-sm border border-rule bg-cream-deep/35 px-5 py-5">
      <div className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-ink-muted">key insight</div>
      <div className="mt-2 font-sans text-[15px] font-semibold text-ink">{title}</div>
      <div className="mt-2 font-sans text-[15px] leading-[1.65] text-ink-muted">{detail}</div>
      {stat ? (
        <div className="mt-4 inline-flex rounded-sm border border-rule bg-bg px-3 py-2 font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-ink-muted">
          {stat}
        </div>
      ) : null}
    </div>
  );
}

function PdfSlide({ title, src, page }: { title: string; src: string; page: number }) {
  const url = `${src}#page=${page}&view=FitH`;
  return (
    <figure className="space-y-2">
      <div className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-ink-muted">{title}</div>
      <div className="overflow-hidden rounded-sm bg-bg">
        <div className="aspect-[4/3] w-full">
          <iframe
            src={url}
            className="h-full w-full"
            title={`${title} (page ${page})`}
            loading="lazy"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
      </div>
    </figure>
  );
}

function InlineImage({
  src,
  alt,
  caption,
  aspect = "4/3"
}: {
  src: string;
  alt: string;
  caption?: string;
  aspect?: "4/3" | "16/9" | "16/10" | "16/8";
}) {
  const aspectClass =
    aspect === "16/9"
      ? "aspect-[16/9]"
      : aspect === "16/10"
        ? "aspect-[16/10]"
        : aspect === "16/8"
          ? "aspect-[16/8]"
          : "aspect-[4/3]";
  return (
    <figure className="space-y-2">
      <div className="overflow-hidden rounded-sm bg-bg">
        <div className={`relative ${aspectClass}`}>
          <Image src={src} alt={alt} fill className="object-contain bg-bg p-2" />
        </div>
      </div>
      {caption ? <figcaption className="font-sans text-[12px] italic text-ink-muted">{caption}</figcaption> : null}
    </figure>
  );
}

function PhaseSection({
  accentTextClass,
  label,
  title,
  children
}: {
  accentTextClass: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className={`block font-sans text-[11px] font-bold uppercase tracking-[0.15em] ${accentTextClass}`}>
        {label}
      </div>
      <h2 className="font-serif text-[24px] leading-[1.2] text-ink">{title}</h2>
      <div className="font-sans text-[16px] leading-[1.7] text-ink">{children}</div>
    </section>
  );
}

function LabeledFigmaEmbed({ label, figmaUrl, title }: { label: string; figmaUrl: string; title: string }) {
  return (
    <figure className="space-y-2">
      <div className="font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-ink-muted">
        {label}
      </div>
      <div className="relative w-full overflow-hidden rounded-sm bg-bg">
        <div className="aspect-[16/9] w-full">
          <iframe
            src={toFigmaEmbedUrl(figmaUrl)}
            className="h-full w-full"
            allowFullScreen
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms allow-downloads"
            referrerPolicy="strict-origin-when-cross-origin"
            title={title}
          />
        </div>
      </div>
    </figure>
  );
}

function InlineNote({ prefix, text }: { prefix: string; text: string }) {
  return (
    <div className="mt-6 border-l-2 border-rule pl-3">
      <span className="font-sans text-[13px] font-semibold text-ink">{prefix} </span>
      <span className="font-sans text-[15px] text-ink-muted">{text}</span>
    </div>
  );
}

