"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Aspect = "16/9" | "16/10" | "4/3";

function aspectClass(aspect: Aspect) {
  if (aspect === "16/10") return "aspect-[16/10]";
  if (aspect === "4/3") return "aspect-[4/3]";
  return "aspect-[16/9]";
}

export function FigmaEmbed({
  embedSrc,
  openUrl,
  title,
  label = "Load Figma embed",
  aspect = "16/9",
  rootMargin = "600px"
}: {
  embedSrc: string;
  openUrl: string;
  title: string;
  label?: string;
  aspect?: Aspect;
  rootMargin?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  const canLoad = useMemo(() => Boolean(embedSrc && openUrl), [embedSrc, openUrl]);

  useEffect(() => {
    if (!canLoad || shouldLoad) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [canLoad, rootMargin, shouldLoad]);

  return (
    <figure className="space-y-2">
      <div className="relative w-full overflow-hidden rounded-sm bg-bg" ref={containerRef}>
        <div className={`${aspectClass(aspect)} w-full`}>
          {shouldLoad ? (
            <iframe
              src={embedSrc}
              className="h-full w-full"
              allowFullScreen
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms allow-downloads"
              referrerPolicy="strict-origin-when-cross-origin"
              title={title}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-cream-deep/30 p-6 text-center">
              <div className="max-w-[44ch] font-sans text-[13px] leading-[1.5] text-ink-muted">
                This prototype is an interactive Figma embed. On slower connections it can take a while to load.
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setShouldLoad(true)}
                  className="inline-flex items-center rounded-sm border border-rule bg-bg px-4 py-2 font-sans text-[12px] font-medium uppercase tracking-[0.1em] text-ink transition-colors hover:bg-cream-deep/40"
                >
                  {label}
                </button>
                <a
                  href={openUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-sans text-[12px] font-medium uppercase tracking-[0.1em] text-ink-muted underline decoration-dotted underline-offset-[3px] hover:text-ink"
                  onClick={() => setShouldLoad(true)}
                >
                  Open in Figma →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </figure>
  );
}

