import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-6">
      <div className="font-serif text-[28px] leading-[1.25] text-ink">Not found</div>
      <div className="font-sans text-[16px] leading-[1.7] text-ink-muted">
        The page you’re looking for isn’t here.
      </div>
      <Link href="/" className="font-sans text-[14px] text-accent">
        ← Home
      </Link>
    </div>
  );
}

