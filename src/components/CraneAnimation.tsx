import { motion } from 'framer-motion';

const CraneAnimation = () => {
  return (
    <div className="relative w-full h-[400px] flex items-end justify-center">
      {/* Crane SVG */}
      <svg 
        className="w-full h-full max-w-[600px]"
        viewBox="0 0 600 400"
        fill="none"
      >
        {/* Sky gradient background */}
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="towerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="jibGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect x="0" y="0" width="600" height="400" fill="url(#skyGradient)" />

        {/* Ground */}
        <rect x="0" y="360" width="600" height="40" fill="#1e293b" />
        <rect x="0" y="358" width="600" height="4" fill="#334155" />

        {/* Crane Base */}
        <rect x="420" y="340" width="80" height="20" rx="2" fill="#475569" />
        <rect x="430" y="330" width="60" height="15" fill="#64748b" />
        
        {/* Main Tower */}
        <motion.g>
          {/* Tower legs */}
          <rect x="445" y="60" width="8" height="275" fill="url(#towerGradient)" />
          <rect x="467" y="60" width="8" height="275" fill="url(#towerGradient)" />
          
          {/* Tower cross braces */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <g key={i}>
              <line 
                x1="445" 
                y1={70 + i * 30} 
                x2="475" 
                y2={90 + i * 30} 
                stroke="#fbbf24" 
                strokeWidth="3"
              />
              <line 
                x1="475" 
                y1={70 + i * 30} 
                x2="445" 
                y2={90 + i * 30} 
                stroke="#fbbf24" 
                strokeWidth="3"
              />
              {/* Horizontal bars */}
              <line 
                x1="445" 
                y1={70 + i * 30} 
                x2="475" 
                y2={70 + i * 30} 
                stroke="#f59e0b" 
                strokeWidth="2"
              />
            </g>
          ))}

          {/* Tower top cap */}
          <rect x="440" y="55" width="40" height="10" rx="2" fill="#f59e0b" />
        </motion.g>

        {/* Rotating Jib Assembly */}
        <motion.g
          style={{ transformOrigin: '460px 60px' }}
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Main jib (front arm) */}
          <rect x="80" y="48" width="380" height="14" rx="2" fill="url(#jibGradient)" />
          
          {/* Jib truss structure */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
            <g key={`jib-${i}`}>
              <line 
                x1={90 + i * 30} 
                y1="48" 
                x2={110 + i * 30} 
                y2="62" 
                stroke="#fcd34d" 
                strokeWidth="2"
              />
              <line 
                x1={110 + i * 30} 
                y1="48" 
                x2={90 + i * 30} 
                y2="62" 
                stroke="#fcd34d" 
                strokeWidth="2"
              />
            </g>
          ))}

          {/* Counter jib (back arm) */}
          <rect x="460" y="48" width="100" height="14" rx="2" fill="url(#jibGradient)" />
          
          {/* Counter jib truss */}
          {[0, 1, 2].map((i) => (
            <g key={`counter-${i}`}>
              <line 
                x1={470 + i * 30} 
                y1="48" 
                x2={490 + i * 30} 
                y2="62" 
                stroke="#fcd34d" 
                strokeWidth="2"
              />
              <line 
                x1={490 + i * 30} 
                y1="48" 
                x2={470 + i * 30} 
                y2="62" 
                stroke="#fcd34d" 
                strokeWidth="2"
              />
            </g>
          ))}

          {/* Counterweight */}
          <rect x="530" y="35" width="35" height="45" rx="3" fill="#3b82f6" />
          <rect x="535" y="40" width="25" height="35" rx="2" fill="#2563eb" />

          {/* Operator cabin */}
          <rect x="420" y="25" width="45" height="40" rx="4" fill="#3b82f6" />
          <rect x="425" y="30" width="20" height="15" rx="2" fill="#93c5fd" opacity="0.8" />
          <rect x="425" y="48" width="35" height="12" rx="1" fill="#1e40af" />

          {/* Tower head / A-frame */}
          <polygon points="460,55 440,20 480,20" fill="#f59e0b" />
          <line x1="460" y1="20" x2="460" y2="55" stroke="#fbbf24" strokeWidth="3" />
          
          {/* Support cables from tower top */}
          <line x1="460" y1="20" x2="90" y2="48" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="460" y1="20" x2="200" y2="48" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="460" y1="20" x2="560" y2="48" stroke="#94a3b8" strokeWidth="1.5" />

          {/* Trolley and Hook Assembly - moves along jib */}
          <motion.g
            animate={{ x: [0, -180, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Trolley */}
            <rect x="220" y="58" width="30" height="12" rx="2" fill="#64748b" />
            <circle cx="227" cy="72" r="4" fill="#475569" />
            <circle cx="243" cy="72" r="4" fill="#475569" />
            
            {/* Cable */}
            <motion.line 
              x1="235" 
              y1="70" 
              x2="235" 
              y2="180"
              stroke="#94a3b8" 
              strokeWidth="2.5"
              animate={{ y2: [180, 280, 180] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Cable drum visual */}
            <rect x="230" y="62" width="10" height="8" rx="1" fill="#475569" />
            
            {/* Hook block */}
            <motion.g
              animate={{ y: [0, 100, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Hook block body */}
              <rect x="225" y="175" width="20" height="15" rx="2" fill="#ef4444" />
              <rect x="228" y="178" width="14" height="9" fill="#dc2626" />
              
              {/* Hook */}
              <path 
                d="M232 190 L232 205 C232 215 245 218 245 208 L245 200" 
                stroke="#fbbf24" 
                strokeWidth="5" 
                fill="none"
                strokeLinecap="round"
              />
              
              {/* Concrete slab being lifted */}
              <motion.g
                animate={{ opacity: [1, 1, 0.2, 0.2, 1] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              >
                <rect x="195" y="215" width="80" height="18" rx="2" fill="#cbd5e1" />
                <rect x="200" y="220" width="70" height="8" fill="#94a3b8" />
                {/* Lifting cables to slab */}
                <line x1="210" y1="205" x2="210" y2="215" stroke="#64748b" strokeWidth="2" />
                <line x1="260" y1="205" x2="260" y2="215" stroke="#64748b" strokeWidth="2" />
              </motion.g>
            </motion.g>
          </motion.g>
        </motion.g>

        {/* Ground elements - stacked slabs */}
        <g>
          {/* Slab stack 1 */}
          <rect x="50" y="340" width="70" height="12" rx="1" fill="#94a3b8" />
          <rect x="50" y="326" width="70" height="12" rx="1" fill="#a1a1aa" />
          <rect x="50" y="312" width="70" height="12" rx="1" fill="#b4b4bc" />
          
          {/* Slab stack 2 */}
          <rect x="140" y="340" width="70" height="12" rx="1" fill="#94a3b8" />
          <rect x="140" y="326" width="70" height="12" rx="1" fill="#a1a1aa" />
        </g>

        {/* Building under construction */}
        <g>
          <rect x="240" y="280" width="120" height="80" fill="#334155" />
          <rect x="250" y="290" width="25" height="30" fill="#1e293b" />
          <rect x="285" y="290" width="25" height="30" fill="#1e293b" />
          <rect x="320" y="290" width="25" height="30" fill="#1e293b" />
          <rect x="250" y="330" width="25" height="30" fill="#1e293b" />
          <rect x="285" y="330" width="25" height="30" fill="#1e293b" />
          <rect x="320" y="330" width="25" height="30" fill="#1e293b" />
          {/* Scaffolding */}
          <line x1="240" y1="280" x2="240" y2="360" stroke="#78716c" strokeWidth="2" />
          <line x1="360" y1="280" x2="360" y2="360" stroke="#78716c" strokeWidth="2" />
        </g>

        {/* Warning lights on crane */}
        <motion.circle 
          cx="460" 
          cy="15" 
          r="4" 
          fill="#ef4444"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.circle 
          cx="90" 
          cy="48" 
          r="3" 
          fill="#ef4444"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
        />
      </svg>
    </div>
  );
};

export default CraneAnimation;
