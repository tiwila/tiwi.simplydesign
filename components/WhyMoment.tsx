 "use client";

import { useEffect, useRef, useState } from "react";

export function WhyMoment({
  children,
  accentColor = "accent"
}: {
  children: React.ReactNode;
  accentColor?: "accent" | "sage" | "terracotta";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="my-12">
      <div
        className={`font-sans text-[11px] font-medium uppercase tracking-[0.12em] ${
          accentColor === "sage"
            ? "text-sage"
            : accentColor === "terracotta"
              ? "text-[#8B3A1A]"
              : "text-accent-dark"
        }`}
      >
        the why moment
      </div>
      <div
        className={`relative mt-3 overflow-hidden rounded-sm px-8 py-7 ${
          accentColor === "sage" ? "bg-sage/12" : accentColor === "terracotta" ? "bg-[#FAF0EB]" : "bg-accent-light"
        }`}
        style={{
          backgroundImage:
            accentColor === "sage"
              ? "var(--texture-noise), linear-gradient(rgba(122,158,135,0.12), rgba(122,158,135,0.12))"
              : accentColor === "terracotta"
                ? "linear-gradient(#FAF0EB, #FAF0EB)"
                : "var(--texture-noise), linear-gradient(var(--color-accent-light), var(--color-accent-light))",
          backgroundSize: "140px 140px, 100% 100%"
        }}
      >
        <span
          className={`absolute left-0 top-0 h-full w-[3px] origin-top transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${accentColor === "sage" ? "bg-sage" : accentColor === "terracotta" ? "bg-terracotta" : "bg-accent"} ${isVisible ? "scale-y-100" : "scale-y-0"}`}
          aria-hidden="true"
        />
        <div className="font-serif text-[19px] leading-[1.65] text-ink">{children}</div>
      </div>
    </section>
  );
}

