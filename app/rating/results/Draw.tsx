import type { Result } from "~/types/TypeControl";

export default function Draw({ score }: { score: string }) {
  return (
    <span className="dark:bg-[#1e293b] bg-[#F1F5F9] dark:text-[#94a3b8] text-[#64748B] px-2 py-0.5 rounded text-xs font-bold text">
      {score}
    </span>
  );
}
