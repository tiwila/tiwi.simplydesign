export function PullQuote({ quote, source }: { quote: string; source: string }) {
  return (
    <figure className="mt-6">
      <blockquote className="border-l-[3px] border-accent pl-5 font-serif text-[20px] italic leading-[1.6] text-ink">
        {quote}
      </blockquote>
      <figcaption className="mt-3 font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-ink-muted">
        — {source}
      </figcaption>
    </figure>
  );
}

