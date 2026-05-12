export interface ClassicalProps {
  isActivated?: boolean;
}

export default function Classical({ isActivated }: ClassicalProps) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5 11H9.5M2.5 1H9.5M8.5 11V8.914C8.49994 8.64881 8.39455 8.39449 8.207 8.207L6 6L3.793 8.207C3.60545 8.39449 3.50006 8.64881 3.5 8.914V11M3.5 1V3.086C3.50006 3.35119 3.60545 3.60551 3.793 3.793L6 6L8.207 3.793C8.39455 3.60551 8.49994 3.35119 8.5 3.086V1"
        stroke={isActivated ? "#FFFFFF" : "#64748B"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
