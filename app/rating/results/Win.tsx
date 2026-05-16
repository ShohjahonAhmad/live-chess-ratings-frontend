export default function Win({ score }: { score: string }) {
  return (
    <span className="bg-[#10B981]/10 text-[#10B981] px-2 py-0.5 rounded text-xs font-bold">
      {score}
    </span>
  );
}
