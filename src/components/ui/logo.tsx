interface LogoProps {
  size?: number;
}

export function Logo({ size = 100 }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 437.55 437.78"
      width={size}
      height={size}
    >
      <defs>
        <linearGradient
          id="linear-gradient"
          x2="437.55"
          y1="218.89"
          y2="218.89"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fb5820"></stop>
          <stop offset="0.44" stopColor="#f9713c"></stop>
          <stop offset="1" stopColor="#f79665"></stop>
        </linearGradient>
      </defs>
      <g style={{ isolation: "isolate" }}>
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <path
              fill="url(#linear-gradient)"
              d="M112.22 206.47c28.75 0 57.51-.19 86.25.15 6.57.08 8 8.14 8-8.29-.21-56.61-.12-113.23-.1-169.84 0-13.78 5-22.29 15.7-26.51C234-2.67 243.43 1.23 252 9.86q87.37 87.62 175 175c14.13 14.12 14.07 28.44-.14 42.67q-99.14 99.29-198.3 198.57c-15.45 15.46-29.3 15.55-44.63.23Q96.17 338.65 8.47 250.88C-6.25 236.13-1 212.8 18.1 207.31c3-.88 6.12-.79 9.2-.79h84.92Z"
            ></path>
            <path
              fill="#e94e2b"
              d="M181.23 206.8h25.21v210.99z"
              style={{ isolation: "isolate", mixBlendMode: "darken" }}
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
}
