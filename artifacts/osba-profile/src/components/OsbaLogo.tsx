interface OsbaLogoProps {
  size?: number;
  color?: string;
}

export function OsbaLogo({ size = 60, color = "#1d3461" }: OsbaLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="44" width="72" height="8" rx="2" fill={color} opacity="0.9"/>
      <rect x="12" y="52" width="56" height="5" rx="1" fill={color} opacity="0.7"/>
      <path
        d="M40 8 L52 22 L52 44 L28 44 L28 22 Z"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
      />
      <path
        d="M35 44 L35 32 Q40 28 45 32 L45 44"
        fill={color}
        opacity="0.8"
      />
      <path
        d="M28 28 L40 8 L52 28"
        fill="none"
        stroke={color}
        strokeWidth="2"
      />
      <circle cx="40" cy="16" r="4" fill={color} opacity="0.6"/>
      <path
        d="M33 30 L33 40"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M47 30 L47 40"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 57 Q40 68 72 57"
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity="0.6"
      />
    </svg>
  );
}
