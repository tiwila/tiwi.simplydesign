 "use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";

type SeeAlsoLink = { href: string; label: string };

export function DictionaryHero({
  seeAlso = []
}: {
  seeAlso?: SeeAlsoLink[];
}) {
  const [isReady, setIsReady] = useState(false);
  const [typedName, setTypedName] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const fullName = "Tiwi Lanre-Adisa";

  const delayStyle = (delay: string): CSSProperties =>
    ({ ["--delay"]: delay } as unknown as CSSProperties);

  useEffect(() => {
    const readyId = window.requestAnimationFrame(() => setIsReady(true));
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedName(fullName.slice(0, index));
      if (index >= fullName.length) {
        window.clearInterval(timer);
      }
    }, 65);

    return () => {
      window.cancelAnimationFrame(readyId);
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const blinkTimer = window.setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 520);

    return () => window.clearInterval(blinkTimer);
  }, []);

  const lineClass = `${isReady ? "hero-line hero-line--in" : "hero-line"} relative z-[1]`;

  return (
    <section className="relative overflow-hidden">
      <div
        className={`${lineClass} flex flex-wrap items-end justify-between gap-x-6 gap-y-2`}
        style={delayStyle("0ms")}
      >
        <h1 className="font-serif text-[64px] font-bold leading-[0.95] text-ink sm:text-[88px]">
          <span>{typedName}</span>
          <span className="hero-cursor" aria-hidden="true" style={{ opacity: cursorVisible ? 1 : 0 }}>
            |
          </span>
        </h1>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <div className="font-serif text-[26px] italic text-ink-muted sm:text-[34px]">/ˈtiː.wi lan.reɪ.əˈdiː.sə/</div>
          <div className="font-serif text-[18px] italic text-ink-muted sm:text-[22px]">
            <span className="sr-only">Pronunciation hint:</span>
            like kiwi but with a T
          </div>
        </div>
      </div>

      <div
        className={`${lineClass} mt-5 font-sans text-[13px] font-medium uppercase tracking-[0.1em] text-ink-muted`}
        style={delayStyle("60ms")}
      >
        noun, proper <span className="mx-2">·</span> also Designer, Researcher, Problem-solver
      </div>

      <div className={`${lineClass} mt-5 border-l-2 border-accent pl-4`} style={delayStyle("120ms")}>
        <div className="font-serif text-[18px] italic leading-[1.7] text-ink-muted sm:text-[22px]">
          [origin: Lagos, Nigeria, circa 2004] <span className="mx-2">·</span> first documented
          <br />
          making things feel easier upon arrival
        </div>
      </div>

      <hr className={`${isReady ? "hero-line hero-line--in" : "hero-line"} my-7 w-full`} style={delayStyle("180ms")} />

      <div
        className={`${lineClass} flex flex-wrap items-baseline gap-x-2 gap-y-2 font-sans text-[12px] font-medium uppercase tracking-[0.1em] text-ink-muted`}
        style={delayStyle("240ms")}
      >
        {seeAlso.length ? <span>See also:</span> : null}
        {seeAlso.map((l, idx) => {
          const isExternal = l.href.startsWith("http") || l.href.startsWith("mailto:");
          const LinkEl = (
            <span className="inline-flex items-baseline gap-x-2">
              <span
                className="text-accent underline decoration-dotted underline-offset-[3px]"
                style={{ textDecorationThickness: "0.5px" }}
              >
                {l.label}
              </span>
              {idx < seeAlso.length - 1 ? <span className="text-ink-muted">·</span> : null}
            </span>
          );

          if (l.href.startsWith("mailto:")) {
            return (
              <a key={l.href} href={l.href} className="text-accent">
                {LinkEl}
              </a>
            );
          }

          return (
            <Link
              key={l.href}
              href={l.href}
              className="text-accent"
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
            >
              {LinkEl}
            </Link>
          );
        })}
      </div>

    </section>
  );
}

