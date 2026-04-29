import Link from "next/link";
import Image from "next/image";

export function CaseStudyCard({
  href,
  title,
  summary,
  year,
  disciplines,
  coverImage,
  hoverTeaser,
  accentColor = "default"
}: {
  href: string;
  title: string;
  summary: string;
  year: string;
  disciplines: string[];
  coverImage?: string;
  hoverTeaser?: string;
  accentColor?: "terracotta" | "sage" | "warm-yellow" | "default";
}) {
  const accentHoverClass =
    accentColor === "terracotta"
      ? "hover:border-terracotta/60"
      : accentColor === "sage"
        ? "hover:border-sage/60"
        : accentColor === "warm-yellow"
          ? "hover:border-warm-yellow/80"
          : "hover:border-accent/55";

  const accentTextHoverClass =
    accentColor === "terracotta"
      ? "group-hover:text-terracotta"
      : accentColor === "sage"
        ? "group-hover:text-sage"
        : accentColor === "warm-yellow"
          ? "group-hover:text-warm-yellow"
          : "group-hover:text-accent";

  const accentTeaserTextClass =
    accentColor === "terracotta"
      ? "text-terracotta"
      : accentColor === "sage"
        ? "text-sage"
        : accentColor === "warm-yellow"
          ? "text-warm-yellow"
          : "text-accent-dark";

  return (
    <Link
      href={href}
      className={`group block rounded-sm border border-rule bg-accent-light/30 transition-[border-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(28,26,23,0.08)] motion-reduce:transform-none ${accentHoverClass}`}
    >
      <div className="border-b-hairline border-rule p-5 sm:p-6">
        <div className="relative overflow-hidden rounded-sm border border-rule">
          <div className="relative aspect-[16/9]">
            {coverImage ? (
              <Image
                src={coverImage}
                alt={`${title} preview`}
                fill
                className="object-contain bg-bg p-2"
              />
            ) : (
              <div className="h-full w-full bg-accent-light/40" />
            )}
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className={`font-serif text-[22px] leading-[1.25] text-ink transition-colors duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${accentTextHoverClass}`}>
          {title}
        </div>
        <div className="mt-2 font-sans text-[16px] leading-[1.7] text-ink-muted">{summary}</div>
        {hoverTeaser ? (
          <div className={`mt-2 max-h-0 overflow-hidden font-handwritten text-[16px] ${accentTeaserTextClass} opacity-0 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:max-h-10 group-hover:opacity-100`}>
            {hoverTeaser}
          </div>
        ) : null}
        <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-2 font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-ink-muted">
          <span>{year}</span>
          {disciplines.map((d) => (
            <span key={d} className="text-ink-muted">
              {d}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

