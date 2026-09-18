import Image from "next/image";
import { WhyMoment } from "@/components/WhyMoment";
import { FigmaEmbed } from "@/components/FigmaEmbed";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="font-serif text-[28px] leading-[1.2] text-ink">{title}</h2>
      <div className="space-y-4 font-sans text-[16px] leading-[1.7] text-ink">{children}</div>
    </section>
  );
}

function Subhead({ children }: { children: React.ReactNode }) {
  return <h3 className="font-sans text-[17px] font-semibold leading-[1.35] text-ink">{children}</h3>;
}

const FRAME = "overflow-hidden rounded-[24px] bg-bg";

function Shot({
  src,
  alt,
  caption
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="space-y-2">
      <div className={FRAME}>
        <div className="relative aspect-[16/9]">
          <Image src={src} alt={alt} fill className="object-contain" unoptimized />
        </div>
      </div>
      <figcaption className="font-sans text-[12px] italic text-ink-muted">{caption}</figcaption>
    </figure>
  );
}

const TALKS_AI_FIGMA_EMBED =
  "https://embed.figma.com/proto/S5DydqoNJD6PnvIqNNj2pS/Talks-AI-Design?node-id=93-2221&scaling=scale-down&content-scaling=fixed&page-id=1%3A5&starting-point-node-id=93%3A2221&embed-host=share";
const TALKS_AI_FIGMA_OPEN =
  "https://www.figma.com/proto/S5DydqoNJD6PnvIqNNj2pS/Talks-AI-Design?node-id=93-2221&scaling=scale-down&content-scaling=fixed&page-id=1%3A5&starting-point-node-id=93%3A2221";

export function TalksAIHero() {
  return (
    <figure className="space-y-2">
      <div className={FRAME}>
        {/* Native img so the animated GIF actually plays */}
        <img
          src="/images/talksai-dashboard-hero.gif"
          alt="Redesigned TalksAI dashboard"
          className="h-auto w-full"
        />
      </div>
      <figcaption className="font-sans text-[12px] italic text-ink-muted">Redesigned Dashboard</figcaption>
    </figure>
  );
}

export function TalksAICaseStudyBody() {
  return (
    <div className="space-y-12">
      <Section title="The problem">
        <p>
          Auto shop owners make expensive decisions every week — buying inventory, hiring, pricing —
          without a clear answer to the one question that matters most: can they actually afford it?
        </p>
        <p>
          TalksAI started as a 48-hour hackathon project (Top 10 Finalist) that tried to solve this
          with an AI assistant. It worked well enough to win over judges, but it had three real gaps:
          numbers with no explanation behind them, recommendations that repeated themselves, and zero
          testing with real people.
        </p>
      </Section>

      <WhyMoment accentColor="mint">
        <div className="space-y-4">
          <p>
            The turning point came from a simple realization while reviewing the MVP: the AI would
            confidently tell a shop owner{" "}
            <em>&ldquo;you can make payroll, but it&apos;s tight&rdquo;</em> — a real, high-stakes
            financial claim — with no way for the owner to check where that came from. Judges at a
            hackathon will take a confident answer at face value. A business owner deciding whether to
            trust an AI with their cash flow won&apos;t, and shouldn&apos;t.
          </p>
          <p>
            That&apos;s the moment this stopped being a polish pass and became a trust problem to
            design for. Everything after — the explainability layer, the testing, the accessibility
            check — followed from that one question:{" "}
            <em>if I were the shop owner, would I actually believe this?</em>
          </p>
        </div>
      </WhyMoment>

      <Section title="What I actually did">
        <Subhead>1. Fixing recommendations that repeated themselves</Subhead>
        <p>
          The original Dashboard said the same three things twice — once in a &ldquo;Daily
          Brief&rdquo; panel, again in &ldquo;Best Next Actions.&rdquo; I gave each panel a different
          job: Daily Brief now explains <em className="font-serif italic">today</em>, in plain
          language. Best Next Actions gives three separate next steps — today, this week, this month —
          each with its own button.
        </p>
        <div className="mx-auto grid max-w-[680px] gap-4 md:grid-cols-2 md:items-start">
          <figure className="space-y-2">
            <div className={FRAME}>
              <Image
                src="/images/talksai-daily-brief.png"
                alt="Redesigned Daily Brief card"
                width={800}
                height={420}
                className="h-auto w-full"
              />
            </div>
            <figcaption className="font-sans text-[12px] italic text-ink-muted">
              Daily Brief — today, in plain language
            </figcaption>
          </figure>
          <figure className="mx-auto w-full max-w-[280px] space-y-2">
            <div className={FRAME}>
              <Image
                src="/images/talksai-best-next-actions.png"
                alt="Redesigned Best Next Actions card"
                width={640}
                height={1100}
                className="h-auto w-full"
              />
            </div>
            <figcaption className="font-sans text-[12px] italic text-ink-muted">
              Best Next Actions — today, this week, this month
            </figcaption>
          </figure>
        </div>

        <Subhead>2. Making the AI show its work</Subhead>
        <p>
          The AI would say the buffer was &ldquo;tight&rdquo; with no way to see why. I added a
          collapsible <strong>&ldquo;Why this answer?&rdquo;</strong> section to the AI Assistant,
          splitting the reasoning into what the AI already knew from setup (safety floor, payroll) and
          what it calculated from live data — shown as an actual math trail, not just a conclusion. I
          also added a before-and-after: what the balance looks like if the suggested action is taken,
          versus if it isn&apos;t.
        </p>
        <figure className="mx-auto max-w-[420px] space-y-2">
          <div className={FRAME}>
            <Image
              src="/images/talksai-ai-assistant.jpg"
              alt="AI Assistant with Why this answer? expanded"
              width={800}
              height={1000}
              className="h-auto w-full"
            />
          </div>
          <figcaption className="font-sans text-[12px] italic text-ink-muted">
            AI Assistant — Why this answer? expanded, showing the calculation trail and projected impact
          </figcaption>
        </figure>
        <p>
          I made a deliberate call to keep this explainability pattern on the AI Assistant only,
          rather than adding it to every Dashboard card too. Safe-to-Spend and Runway on the Dashboard
          stay as simple, glanceable numbers — the Dashboard&apos;s job is a fast daily read, the AI
          Assistant&apos;s job is a deeper trust check when a specific decision is on the line.
          Splitting responsibility that way kept the Dashboard clean instead of turning every card
          into a collapsible explanation.
        </p>

        <Subhead>3. Cutting what didn&apos;t earn its spot, then building an information hierarchy</Subhead>
        <p>
          Before adding more cards to the Dashboard, I checked each proposed one against what already
          existed. Payment History was cut entirely — it just repeated what a connected bank account
          already shows, working against TalksAI&apos;s whole point of surfacing what&apos;s coming,
          not what already happened.
        </p>
        <p>
          With six cards and two charts remaining, a flat grid would have read as clutter, not
          clarity. I built an information hierarchy instead: Top Level holds the numbers that answer
          &ldquo;where do I stand right now&rdquo; (Cash Balance, Safe-to-Spend, Runway), Mid Level
          holds near-term context and actions (Daily Brief, Best Next Actions, Upcoming Bills), Low
          Level holds what&apos;s worth knowing but not urgent (Pending Invoices, Upcoming Expenses).
          Priority, not category — because the product exists to answer one urgent question, and
          grouping by type doesn&apos;t answer it any faster. The tiers show through visual weight and
          position, not labels.
        </p>
      </Section>

      <Section title="Testing it with real people">
        <p>
          I ran a small, unmoderated test using a clickable Figma prototype, focused on one question:
          does seeing the AI&apos;s reasoning actually make someone trust the recommendation more?
        </p>
        <p>
          Both participants understood the recommendation correctly, and both said the reasoning layer
          increased their confidence — one specifically called out that seeing the safety floor and
          payroll numbers made the recommendation &ldquo;feel accurate,&rdquo; not just plausible.
        </p>
        <p>
          They also converged, independently, on the same gap from two different angles: one
          didn&apos;t know <em className="font-serif italic">where</em> the $3,000 figure came from,
          the other wanted to know <em className="font-serif italic">how current</em> the numbers
          were. That convergence was the clearest signal in the whole test — two people, unprompted,
          pointing at the same missing piece of trust.
        </p>
        <p>
          <strong>What changed as a result:</strong>
        </p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            The $3,000 invoice now names the actual client (&ldquo;$3,000 — Smith Auto Group&rdquo;)
            instead of appearing as an unattributed number
          </li>
          <li>
            A &ldquo;Live data synced [X] minutes ago&rdquo; indicator was added at the top of the
            Dashboard, scoped honestly to the data that&apos;s actually live rather than implying every
            number updates in real time
          </li>
        </ul>
        <div className="overflow-hidden rounded-[24px]">
          <FigmaEmbed
            embedSrc={TALKS_AI_FIGMA_EMBED}
            openUrl={TALKS_AI_FIGMA_OPEN}
            title="TalksAI interactive prototype"
            label="Load prototype"
            aspect="16/9"
          />
          <p className="mt-2 font-sans text-[12px] italic text-ink-muted">
            The same clickable prototype used in testing.
          </p>
        </div>
        <p>
          This was a small, directional test, not a full study — a stronger next step would be
          moderated sessions with real shop owners.
        </p>
      </Section>

      <Section title="What I didn't do (and why)">
        <p>
          <strong>Growth Simulator stayed untouched this round.</strong> It runs on the same shared
          forecast as the other two screens, so it&apos;s a natural next step — but with limited time,
          going deep on two screens beat going shallow on three.
        </p>
        <Shot
          src="/images/talksai-growth-next.jpg"
          alt="TalksAI Growth Simulator, not redesigned in this pass"
          caption="Growth Simulator — what's next, not redesigned"
        />
        <p>
          <strong>The explainability layer stayed on AI Assistant only</strong> — a deliberate scope
          decision, covered above, not a time cut.
        </p>
      </Section>

      <Section title="Accessibility">
        <p>
          I ran a contrast and structural review across the redesigned Dashboard and AI Assistant
          screens using Stark, a Figma accessibility plugin. Overall contrast came in at 19.9:1, a
          strong pass. Body text (light gray captions) measured 4.83:1 — clears WCAG AA, just short of
          AAA, flagged as a future refinement rather than a failure. The mint-green &ldquo;View
          Details&rdquo; links on white backgrounds were a real risk and got fixed.
        </p>
        <div className="grid gap-4 md:grid-cols-[1fr_200px] md:items-start">
          <figure className="space-y-2">
            <div className={FRAME}>
              <Image
                src="/images/talksai-a11y-runway.png"
                alt="Current Runway card before and after the accessibility pass"
                width={1200}
                height={420}
                className="h-auto w-full"
              />
            </div>
            <figcaption className="font-sans text-[12px] italic text-ink-muted">
              Before / after — Current Runway body text contrast
            </figcaption>
          </figure>
          <figure className="mx-auto w-full max-w-[200px] space-y-2">
            <div className={FRAME}>
              <Image
                src="/images/talksai-a11y-nav.jpg"
                alt="Sidebar navigation before and after the accessibility pass"
                width={480}
                height={900}
                className="h-auto w-full"
                unoptimized
              />
            </div>
            <figcaption className="font-sans text-[12px] italic text-ink-muted">
              Before / after — mint-green nav and logout contrast on dark
            </figcaption>
          </figure>
        </div>
        <p>
          Icons on both screens are paired with visible text rather than carrying meaning alone; charts
          are the exception and are flagged as needing alt text or a data-table equivalent in code.
          Keyboard and focus behavior is documented as an intended design spec rather than a tested
          result, since this lives in Figma, not shipped code.
        </p>
        <p>
          This was a lightweight, tool-assisted review, not a full audit — a real next step is testing
          with a screen reader and keyboard-only navigation once this is built.
        </p>
      </Section>

      <section className="space-y-6">
        <h2 className="font-serif text-[28px] leading-[1.2] text-ink">The outcome</h2>
        <p className="font-sans text-[16px] leading-[1.7] text-ink">
          What was a fast, working hackathon demo is now a more thoughtful product: recommendations
          that don&apos;t repeat themselves, AI advice with a visible and verified reasoning trail,
          and a dashboard organized around what an owner needs to know first — reconciled end to end,
          so the same numbers hold up whether you&apos;re glancing at the Dashboard or asking the AI
          Assistant directly.
        </p>
        <div className="grid gap-4 pt-2 sm:grid-cols-3">
          <div>
            <div className="font-sans text-[40px] font-bold leading-none text-[var(--talksai-mint-ink)]">
              Top 10
            </div>
            <div className="mt-2 font-sans text-[12px] font-medium uppercase tracking-[0.1em] text-ink-muted">
              hackathon finalist
            </div>
          </div>
          <div>
            <div className="font-sans text-[40px] font-bold leading-none text-[var(--talksai-mint-ink)]">
              2
            </div>
            <div className="mt-2 font-sans text-[12px] font-medium uppercase tracking-[0.1em] text-ink-muted">
              priority flows redesigned
            </div>
          </div>
          <div>
            <div className="font-sans text-[40px] font-bold leading-none text-[var(--talksai-mint-ink)]">
              19.9:1
            </div>
            <div className="mt-2 font-sans text-[12px] font-medium uppercase tracking-[0.1em] text-ink-muted">
              overall contrast ratio
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
