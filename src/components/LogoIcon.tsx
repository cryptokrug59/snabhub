const LogoIcon = () => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0 transition-all duration-700 ease-in-out group-hover:rotate-[360deg] group-hover:scale-110 drop-shadow-md"
  >
    <defs>
      <linearGradient id="dropGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22d3ee" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
      <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
        <feOffset dx="1" dy="1" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.3" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#innerShadow)">
      {[0, 120, 240].map((angle, i) => (
        <path
          key={i}
          d="M50 50 C 50 50 20 25 35 10 C 55 -5 85 10 90 35 C 95 55 75 65 50 50"
          fill="url(#dropGradient)"
          transform={`rotate(${angle - 30} 50 50)`}
          className="origin-center"
          stroke="white"
          strokeWidth="0.5"
          strokeOpacity="0.1"
        />
      ))}
      <circle cx="50" cy="50" r="4" fill="white" className="opacity-0" />
    </g>
  </svg>
);

export default LogoIcon;
