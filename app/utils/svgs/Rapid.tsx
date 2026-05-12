import type { ClassicalProps } from "./Classical";

export default function Rapid({ isActivated }: ClassicalProps) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_0_21)">
        <path
          d="M2 7C1.80688 7.00066 1.63064 6.89004 1.54728 6.71583C1.46391 6.54162 1.48833 6.33498 1.61 6.185L6.56 1.085C6.63648 0.996726 6.76388 0.973166 6.86687 1.02825C6.96985 1.08334 7.02098 1.20239 6.99 1.315L6.03 4.325C5.97254 4.47879 5.99424 4.65098 6.08805 4.78571C6.18186 4.92044 6.33583 5.00053 6.5 5H10C10.1931 4.99934 10.3694 5.10996 10.4527 5.28417C10.5361 5.45838 10.5117 5.66502 10.39 5.815L5.44 10.915C5.36353 11.0033 5.23612 11.0268 5.13314 10.9717C5.03015 10.9167 4.97903 10.7976 5.01 10.685L5.97 7.675C6.02746 7.52121 6.00577 7.34902 5.91196 7.21429C5.81814 7.07956 5.66417 6.99947 5.5 7H2"
          stroke={isActivated ? "#FFFFFF" : "#64748B"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_0_21">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
