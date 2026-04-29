const LABELS: Record<"problem" | "process" | "broke" | "visuals", string> = {
  problem: "the problem",
  process: "what i actually did",
  broke: "what broke",
  visuals: "supporting visuals"
};

export function CaseStudySection({
  beat,
  children
}: {
  beat: "problem" | "process" | "broke" | "visuals";
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-ink-muted">
        {LABELS[beat]}
      </div>
      <div className="font-sans text-[16px] leading-[1.7] text-ink">{children}</div>
    </section>
  );
}

