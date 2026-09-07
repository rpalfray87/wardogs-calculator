// Icones en SVG plutot qu'en caracteres : rendu identique partout, epaisseur de
// trait coherente et couleur pilotee par currentColor.

interface IconProps {
  size?: number;
}

function Svg({ size = 15, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function IconBack(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9.5 3.5 5 8l4.5 4.5" />
      <path d="M5 8h7.5" />
    </Svg>
  );
}

export function IconSettings(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2 4.5h4.5M11 4.5h3M2 11.5h2.5M9 11.5h5" />
      <circle cx="8.5" cy="4.5" r="2" />
      <circle cx="6.5" cy="11.5" r="2" />
    </Svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m4 4 8 8M12 4l-8 8" />
    </Svg>
  );
}

export function IconTrash(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2.5 4.5h11" />
      <path d="M6.5 4.5V2.8h3v1.7" />
      <path d="m4.2 4.5.6 8.2a1 1 0 0 0 1 .9h4.4a1 1 0 0 0 1-.9l.6-8.2" />
      <path d="M6.8 7v4M9.2 7v4" />
    </Svg>
  );
}
