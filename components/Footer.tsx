import Link from "next/link";

export function Footer() {
  return (
    <footer id="footer" className="border-t-hairline border-rule bg-accent-light/35">
      <div className="mx-auto w-full max-w-[960px] px-3 py-8 sm:px-4">
        <div className="grid gap-4 md:grid-cols-2 md:items-center">
          <div
            className="text-[14px] font-medium text-ink"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Tiwi Lanre-Adisa
          </div>

          <div className="flex gap-4 md:justify-center">
            <a
              className="inline-flex items-center text-[14px] text-accent"
              style={{ fontFamily: "var(--font-inter)" }}
              href="mailto:tiwilanreadisa@gmail.com"
              aria-label="Email tiwilanreadisa@gmail.com"
            >
              <span aria-hidden="true" className="inline-flex h-5 w-5 items-center justify-center text-[15px] leading-none">
                ✉
              </span>
            </a>
            <Link
              className="inline-flex items-center text-[14px] text-accent"
              style={{ fontFamily: "var(--font-inter)" }}
              href="https://www.linkedin.com/in/tiwilanreadisa"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-current"
              >
                <path d="M20.45 20.45h-3.55v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.65H9.38V9h3.4v1.56h.05c.47-.9 1.62-1.85 3.33-1.85 3.56 0 4.22 2.35 4.22 5.41v6.33zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.78C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.78 24h20.44C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z" />
              </svg>
            </Link>
          </div>

        </div>

        <div
          className="mt-6 text-[11px] text-ink-muted"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          © 2026 Tiwi Lanre-Adisa — made with strong opinions and weak coffee.
        </div>
      </div>
    </footer>
  );
}

