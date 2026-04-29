import { getAllCaseStudies } from "@/lib/work";
import { WorkIndexWithPreview } from "@/components/WorkIndexWithPreview";

export default async function WorkIndexPage() {
  const studies = await getAllCaseStudies();

  return (
    <div className="space-y-10">
      <div className="font-serif text-[28px] leading-[1.25] text-ink">
        work <span className="text-ink-muted">/wərk/</span>{" "}
        <span className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-ink-muted">
          noun
        </span>{" "}
        — a record of problems solved.
      </div>

      <WorkIndexWithPreview studies={studies} />
    </div>
  );
}

