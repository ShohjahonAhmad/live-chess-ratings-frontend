import type { JSX } from "react";

export default function TimeControlComponent({
  svg,
  name,
  isActivated,
  onClick,
}: {
  svg: JSX.Element;
  name: String;
  isActivated: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`flex items-center py-1 px-4 rounded-full gap-1.5 
        transition-all duration-200 ease-in-out active:scale-95 select-none
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900
        ${
          isActivated
            ? "bg-blue-500 text-white shadow-sm"
            : "bg-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200"
        }`}
      onClick={onClick}
    >
      {svg}
      <span className="text-white font-bold text-xs">{name}</span>
    </button>
  );
}
