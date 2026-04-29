export function CaseStudyOutcome({
  paragraph,
  metrics,
  metricColorClass = "text-accent"
}: {
  paragraph: string;
  metrics: Array<{ value: string; label: string }>;
  metricColorClass?: string;
}) {
  return (
    <section className="space-y-6">
      <div className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-ink-muted">
        the outcome
      </div>
      <p className="font-sans text-[16px] leading-[1.7] text-ink">{paragraph}</p>
      {metrics.length ? (
        <div className="grid gap-4 pt-2 sm:grid-cols-3">
          {metrics.slice(0, 3).map((m) => (
            <div key={`${m.value}-${m.label}`}>
              <div className={`font-sans text-[40px] font-bold leading-none ${metricColorClass}`}>{m.value}</div>
              <div className="mt-2 font-sans text-[12px] font-medium uppercase tracking-[0.1em] text-ink-muted">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

