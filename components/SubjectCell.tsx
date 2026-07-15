import { SUBJECTS, type SubjectKey } from "@/lib/subjects";

interface SubjectCellProps {
  subject: SubjectKey | null;
  highlight: SubjectKey | null;
  className?: string;
}

export default function SubjectCell({
  subject,
  highlight,
  className = "",
}: SubjectCellProps) {
  if (!subject) {
    return (
      <div
        className={`flex h-full min-h-[52px] items-center justify-center rounded-lg border border-dashed border-slate-200 text-slate-300 ${className}`}
        aria-hidden="true"
      >
        <span className="text-xs">—</span>
      </div>
    );
  }

  const meta = SUBJECTS[subject];
  const isHighlighted = highlight === subject;
  const isDimmed = highlight !== null && !isHighlighted;

  return (
    <div
      className={[
        "flex h-full min-h-[52px] flex-col justify-center rounded-lg border px-2.5 py-1.5 text-center transition-all duration-300",
        meta.badge,
        isHighlighted ? `ring-2 ${meta.ring} shadow-sm scale-[1.03]` : "",
        isDimmed ? "opacity-35 saturate-50" : "",
        className,
      ].join(" ")}
      title={meta.name}
    >
      <span className="text-[13px] font-bold leading-tight tracking-wide">
        {subject}
      </span>
      <span className="mt-0.5 line-clamp-1 text-[10.5px] font-medium leading-tight opacity-80">
        {meta.name}
      </span>
    </div>
  );
}
