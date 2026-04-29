import Image from "next/image";

export default function AboutPage() {
  const aboutProfileImage = "/images/about.jpg";

  return (
    <article className="space-y-10">
      <header className="space-y-6">
        <h1 className="font-serif text-[40px] leading-[1.1] text-ink sm:text-[48px]">About Me</h1>
        <div className="relative aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-xl border border-rule bg-accent-light/20">
          {aboutProfileImage ? (
            <Image
              src={aboutProfileImage}
              alt="Profile picture"
              fill
              sizes="(max-width: 640px) 100vw, 340px"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex aspect-[4/5] items-center justify-center font-sans text-[12px] font-medium uppercase tracking-[0.08em] text-ink-muted">
              Profile Picture
            </div>
          )}
        </div>
        <p className="max-w-3xl font-sans text-[16px] leading-[1.7] text-ink">
          I&apos;m a 4th-year CS student at WLU with a deep love for UX/UI. I combine technical grit
          with a designer&apos;s intuition to build web experiences that actually make sense. I&apos;m eager
          to bring my hybrid skill set to a collaborative team and turn complex problems into
          &apos;simply divine&apos; solutions.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-serif text-[28px] leading-[1.2] text-ink">Off theClock</h2>
        <p className="font-sans text-[16px] leading-[1.7] text-ink">
          When I&apos;m not fixing figma frames or debugging code, you can find me...
        </p>
        <ul className="space-y-2">
          <li className="font-sans text-[16px] leading-[1.7] text-ink">💃 Dancing &amp; Singing</li>
          <li className="font-sans text-[16px] leading-[1.7] text-ink">🎸 Strumming my Guitar</li>
          <li className="font-sans text-[16px] leading-[1.7] text-ink">📚 Lost in a Book</li>
          <li className="font-sans text-[16px] leading-[1.7] text-ink">📺 Binging K-Dramas</li>
          <li className="font-sans text-[16px] leading-[1.7] text-ink">🙏 Reading my Bible</li>
        </ul>
        <p className="font-sans text-[16px] leading-[1.7] text-ink">
          <strong>Fun Fact:</strong> If you haven&apos;t guessed by now, my favorite color is Purple. I
          love how it balances creativity with a sense of luxury and depth.
        </p>
      </section>

      <section className="space-y-4 rounded-xl border border-rule bg-cream-deep/45 p-5 sm:p-6">
        <h3 className="font-serif text-[24px] leading-[1.2] text-ink">Resume</h3>
        <ul className="space-y-4">
          <li>
            <p className="font-sans text-[14px] font-semibold text-ink">
              UX/UI Designer, Frontend Dev. Intern — Agentflow
            </p>
            <p className="font-sans text-[14px] text-ink-muted">Sept 2025 - Present</p>
            <p className="mt-1 font-sans text-[15px] leading-[1.7] text-ink">
              Designed website UX/UI, brand systems, and in-workspace messaging flows to improve clarity
              and usability.
            </p>
          </li>
          <li>
            <p className="font-sans text-[14px] font-semibold text-ink">
              UX/UI Designer, Web Designer Intern — Moro App
            </p>
            <p className="font-sans text-[14px] text-ink-muted">Aug 2025 - Sept 2025</p>
            <p className="mt-1 font-sans text-[15px] leading-[1.7] text-ink">
              Redesigned the company website, led visual identity updates, and supported marketing
              content production.
            </p>
          </li>
          <li>
            <p className="font-sans text-[14px] font-semibold text-ink">
              BSc Computer Science (Minor in UX Design) — Wilfrid Laurier University
            </p>
            <p className="font-sans text-[14px] text-ink-muted">Sept 2022 - Present</p>
            <p className="mt-1 font-sans text-[15px] leading-[1.7] text-ink">
              Vice President of Content at UX Laurier, with additional design leadership experience
              through Enactus Laurier.
            </p>
          </li>
        </ul>
        <a
          href="/api/resume"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-full border border-accent px-5 py-2 font-sans text-[13px] font-medium uppercase tracking-[0.08em] text-accent transition-colors duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:bg-accent hover:text-white"
        >
          See my resume
        </a>
      </section>
    </article>
  );
}

