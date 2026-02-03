import { motion } from 'framer-motion';

const CraneAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Crane base structure */}
      <svg 
        className="absolute bottom-0 right-0 w-[500px] h-[450px] opacity-20"
        viewBox="0 0 500 450"
        fill="none"
      >
        {/* Vertical tower */}
        <motion.g>
          {/* Main tower structure */}
          <rect x="380" y="80" width="20" height="370" fill="currentColor" className="text-slate-500" />
          <rect x="360" y="80" width="60" height="10" fill="currentColor" className="text-slate-400" />
          
          {/* Tower lattice pattern */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <g key={i}>
              <line 
                x1="380" 
                y1={90 + i * 45} 
                x2="400" 
                y2={135 + i * 45} 
                stroke="currentColor" 
                strokeWidth="2" 
                className="text-slate-600"
              />
              <line 
                x1="400" 
                y1={90 + i * 45} 
                x2="380" 
                y2={135 + i * 45} 
                stroke="currentColor" 
                strokeWidth="2" 
                className="text-slate-600"
              />
            </g>
          ))}
          
          {/* Base */}
          <rect x="340" y="440" width="100" height="10" fill="currentColor" className="text-slate-400" />
          <rect x="350" y="430" width="80" height="20" fill="currentColor" className="text-slate-500" />
        </motion.g>

        {/* Horizontal jib (arm) - animated rotation */}
        <motion.g
          style={{ originX: '390px', originY: '85px' }}
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Main jib */}
          <rect x="100" y="75" width="290" height="12" fill="currentColor" className="text-slate-400" />
          
          {/* Jib lattice */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <g key={i}>
              <line 
                x1={110 + i * 28} 
                y1="75" 
                x2={138 + i * 28} 
                y2="87" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                className="text-slate-600"
              />
              <line 
                x1={138 + i * 28} 
                y1="75" 
                x2={110 + i * 28} 
                y2="87" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                className="text-slate-600"
              />
            </g>
          ))}

          {/* Counter jib (back) */}
          <rect x="390" y="75" width="80" height="12" fill="currentColor" className="text-slate-400" />
          
          {/* Counterweight */}
          <rect x="440" y="60" width="30" height="40" fill="currentColor" className="text-brand-primary/60" />

          {/* Cabin */}
          <rect x="370" y="55" width="40" height="35" rx="3" fill="currentColor" className="text-brand-accent/40" />
          <rect x="375" y="60" width="15" height="12" rx="2" fill="currentColor" className="text-slate-700" />
        </motion.g>

        {/* Cable and hook - animated along jib */}
        <motion.g
          animate={{ x: [0, -120, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Trolley */}
          <rect x="200" y="72" width="20" height="8" fill="currentColor" className="text-slate-300" />
          
          {/* Cable */}
          <motion.line 
            x1="210" 
            y1="80" 
            x2="210" 
            y2="200"
            stroke="currentColor" 
            strokeWidth="2" 
            className="text-slate-400"
            animate={{ y2: [200, 280, 200] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Hook */}
          <motion.g
            animate={{ y: [0, 80, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path 
              d="M205 195 L215 195 L215 205 L220 210 L220 220 C220 228 212 232 210 232 C208 232 200 228 200 220 L200 210 L205 205 Z" 
              fill="currentColor" 
              className="text-brand-accent"
            />
            
            {/* Slab/plate being lifted */}
            <motion.g
              animate={{ opacity: [1, 1, 0.3, 0.3, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            >
              <rect x="170" y="235" width="80" height="15" rx="2" fill="currentColor" className="text-slate-300" />
              <rect x="175" y="240" width="70" height="5" fill="currentColor" className="text-slate-400" />
            </motion.g>
          </motion.g>
        </motion.g>
      </svg>

      {/* Ground with stacked slabs */}
      <div className="absolute bottom-0 right-10 flex gap-2">
        {/* Stack of slabs on the ground */}
        <motion.div 
          className="flex flex-col gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-16 h-3 bg-slate-400 rounded-sm"
              animate={{ 
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                delay: i * 0.5 
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Floating construction particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-brand-accent/30 rounded-full"
          style={{
            right: `${20 + i * 15}%`,
            bottom: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
};

export default CraneAnimation;
