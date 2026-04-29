"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { CaseStudy } from "@/lib/work";

export function WorkIndexWithPreview({ studies }: { studies: CaseStudy[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  return (
    <div>
      <ol className="space-y-5 lg:pr-[280px]" onMouseLeave={() => setActiveSlug(null)}>
        {studies.map((c, idx) => (
          (() => {
            const hoverTextClass =
              c.accentColor === "terracotta"
                ? "hover:text-terracotta"
                : c.accentColor === "sage"
                  ? "hover:text-sage"
                  : c.accentColor === "warm-yellow"
                    ? "hover:text-warm-yellow"
                    : "hover:text-accent";

            const teaserTextClass =
              c.accentColor === "terracotta"
                ? "text-terracotta"
                : c.accentColor === "sage"
                  ? "text-sage"
                  : c.accentColor === "warm-yellow"
                    ? "text-warm-yellow"
                    : "text-accent-dark";

            return (
          <li
            key={c.slug}
            className="relative grid grid-cols-[24px_1fr] gap-x-4"
            onMouseEnter={() => setActiveSlug(c.slug)}
            onFocus={() => setActiveSlug(c.slug)}
          >
            <div className="pt-[2px] font-sans text-[12px] font-medium text-ink-muted">{idx + 1}.</div>
            <div className="border-t-hairline border-rule pt-5">
              <Link
                href={`/work/${c.slug}`}
                className={`group/link block font-serif text-[22px] leading-[1.25] text-ink transition-colors duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${hoverTextClass}`}
              >
                {c.title}
              </Link>
              <div className="mt-2 font-sans text-[16px] leading-[1.7] text-ink-muted">{c.summary}</div>
              {c.hoverTeaser ? (
                <div
                  className={`mt-2 max-h-0 overflow-hidden font-handwritten text-[16px] ${teaserTextClass} opacity-0 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${activeSlug === c.slug ? "max-h-10 opacity-100" : ""}`}
                >
                  {c.hoverTeaser}
                </div>
              ) : null}
              <div className="mt-4 font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-ink-muted">
                {c.year}
              </div>
            </div>
            <div
              className={`pointer-events-none absolute left-[calc(100%+14px)] top-5 hidden w-[240px] rounded-[10px] bg-accent-light/70 p-2 shadow-[0_10px_24px_rgba(28,26,23,0.18)] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] lg:block ${activeSlug === c.slug ? "translate-y-0 rotate-[-2deg] scale-100 opacity-100" : "translate-y-2 rotate-0 scale-95 opacity-0"}`}
              aria-hidden={activeSlug === c.slug ? "false" : "true"}
            >
              <div className="relative overflow-hidden rounded-[8px] border border-rule bg-bg">
                <div className="relative aspect-[4/3]">
                  {c.coverImage ? (
                    <Image
                      src={c.coverImage}
                      alt={`${c.title} preview`}
                      fill
                      className="object-contain bg-bg p-2 transition-opacity duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                    />
                  ) : (
                    <div className="h-full w-full bg-accent-light/30" />
                  )}
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2 px-1">
                <span className="h-[10px] w-[10px] rounded-full border border-rule bg-bg" />
                <span className="h-[10px] w-[10px] rounded-full border border-rule bg-bg" />
              </div>
            </div>
          </li>
            );
          })()
        ))}
      </ol>
    </div>
  );
}

