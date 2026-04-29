import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CaseStudyContext } from "@/components/CaseStudyContext";
import { CaseStudyOutcome } from "@/components/CaseStudyOutcome";
import { CaseStudySection } from "@/components/CaseStudySection";
import { PullQuote } from "@/components/PullQuote";
import { WhyMoment } from "@/components/WhyMoment";
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
            <div className="relative w-full overflow-hidden rounded-sm border border-hairline border-rule bg-bg">
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
            <div className="relative w-full overflow-hidden rounded-sm border border-hairline border-rule bg-bg">
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
        <div className="relative w-full overflow-hidden rounded-sm">
          <div className="relative aspect-[16/9]">
            <Image src={cs.heroImage} alt={`${cs.title} hero`} fill className="object-cover" unoptimized />
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
            <div className="relative w-full overflow-hidden rounded-sm border border-rule bg-bg">
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
            </div>
          ))}

          {cs.lofiPrototypeUrl ? (
            <div className="space-y-2">
              <h3 className="font-sans text-[14px] font-semibold text-ink">Lo-Fi Prototype</h3>
              <figure className="space-y-2">
                <div className="relative w-full overflow-hidden rounded-sm border border-rule bg-bg">
                  <div className="aspect-[16/10] w-full">
                    <iframe
                      src={toFigmaEmbedUrl(cs.lofiPrototypeUrl)}
                      className="h-full w-full"
                      allowFullScreen
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms allow-downloads"
                      referrerPolicy="strict-origin-when-cross-origin"
                      title={`${cs.title} Lo-Fi Figma prototype`}
                    />
                  </div>
                </div>
                <figcaption className="font-sans text-[12px] italic text-ink-muted">
                  Lo-fi prototype — guided matching flow, round 1 testing
                </figcaption>
              </figure>
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
              <div className="relative w-full overflow-hidden rounded-sm border border-rule bg-bg">
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
                    <div className="relative overflow-hidden rounded-sm border border-rule bg-bg">
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
                    <div className="relative overflow-hidden rounded-sm border border-rule bg-bg">
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
              <div className="relative w-full overflow-hidden rounded-sm border border-rule bg-bg">
                <div className="aspect-[16/10] w-full">
                  <iframe
                    src={toFigmaEmbedUrl(cs.finalPrototypeUrl ?? cs.prototypeUrl ?? "")}
                    className="h-full w-full"
                    allowFullScreen
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms allow-downloads"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title={`${cs.title} Final Figma prototype`}
                  />
                </div>
              </div>
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

      <CaseStudySection beat="broke">
        <p>{cs.sections.whatBroke}</p>
      </CaseStudySection>

      {isTheraLink && (cs.finalPrototypeUrl || cs.highFidelityCtaUrl) ? (
        <section className="space-y-4">
          <div className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-sage">
            high fidelity designs
          </div>
          <figure className="space-y-3">
            <div className="relative overflow-hidden rounded-sm border border-rule bg-bg">
              <div className="aspect-[16/10] w-full">
                <iframe
                  src={toFigmaEmbedUrl(cs.finalPrototypeUrl ?? cs.highFidelityCtaUrl ?? "")}
                  className="h-full w-full"
                  allowFullScreen
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms allow-downloads"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title={`${cs.title} High-Fidelity Figma prototype`}
                />
              </div>
            </div>
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
      <div className="relative w-full overflow-hidden rounded-sm border border-hairline border-rule bg-bg">
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

