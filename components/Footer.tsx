import Link from "next/link";
import Image from "next/image";

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
              <Image
                src="/api/local-image?key=linkedin"
                alt=""
                aria-hidden="true"
                width={20}
                height={20}
                className="h-5 w-5 rounded-sm object-cover"
              />
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

