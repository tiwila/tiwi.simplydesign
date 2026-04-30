import Link from "next/link";

const links = [
  { href: "/", label: "Home", annotation: "← start here" },
  { href: "/work", label: "Work", annotation: "← the real stuff" },
  { href: "/about", label: "About", annotation: "← nice to meet you." },
  { href: "#footer", label: "Contact", annotation: "← let's talk." }
] as const;

export function Nav() {
  return (
    <header className="border-b-hairline border-accent-dark/30 bg-accent-dark text-bg">
      <div className="mx-auto flex w-full max-w-[960px] items-baseline justify-between px-3 py-6 sm:px-4">
        <Link
          href="/"
          className="font-serif text-[20px] leading-none text-bg"
        >
          TLA
        </Link>
        <nav className="flex gap-5">
          {links.map((l) => (
            <div key={l.href} className="group/nav relative">
              <Link
                href={l.href}
                className="text-[11px] font-medium uppercase tracking-[0.1em] text-bg/85 transition-colors duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:text-bg"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {l.label}
              </Link>
              <span className="pointer-events-none absolute left-0 top-[17px] hidden -rotate-2 whitespace-nowrap font-handwritten text-[13px] text-bg/80 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover/nav:translate-y-[3px] group-hover/nav:opacity-100 md:block">
                {l.annotation}
              </span>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}

