export function CaseStudyContext({
  role,
  context,
  timeline,
  brief
}: {
  role: string;
  context: string;
  timeline: string;
  brief: string;
}) {
  const items = [
    { label: "Role", value: role },
    { label: "Context", value: context },
    { label: "Timeline", value: timeline },
    { label: "Brief", value: brief }
  ];

  return (
    <section className="space-y-6">
      <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.label} className="space-y-1">
            <dt className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-ink-muted">
              {item.label}
            </dt>
            <dd className="font-sans text-[15px] leading-[1.55] text-ink">{item.value}</dd>
          </div>
        ))}
      </dl>
      <hr />
    </section>
  );
}

