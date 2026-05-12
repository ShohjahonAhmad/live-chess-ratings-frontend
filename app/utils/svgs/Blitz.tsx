import type { ClassicalProps } from "./Classical";

export default function Blitz({ isActivated }: ClassicalProps) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 1.5C6.33333 2.83333 7 3.91667 8 4.75C9 5.58333 9.5 6.5 9.5 7.5C9.5 9.4317 7.9317 11 6 11C4.0683 11 2.5 9.4317 2.5 7.5C2.5 6.95907 2.67544 6.43274 3 6C3 6.68989 3.56011 7.25 4.25 7.25C4.93989 7.25 5.5 6.68989 5.5 6C5.5 5 4.75 4.5 4.75 3.5C4.75 2.83333 5.16667 2.16667 6 1.5"
        stroke={isActivated ? "#FFFFFF" : "#64748B"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
