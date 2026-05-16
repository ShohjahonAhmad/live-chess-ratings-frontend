export default function Loss({ score }: { score: string }) {
  return (
    <span className="bg-[#EF4444]/10 text-[#EF4444] px-2 py-0.5 rounded text-xs font-bold">
      {score}
    </span>
  );
}
