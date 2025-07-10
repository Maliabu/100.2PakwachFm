'use client'

import { motion, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

interface CustomGaugeProps {
  percent: number // 0–100
  label?: string
  size?: number
  strokeColor?: string
  needleColor?: string
  showTicks?: boolean
}

export function CustomGauge({
  percent,
  label,
  size = 40,
  strokeColor = '#4b5563', // gray-600
  needleColor = '#ef4444', // red-500
  showTicks = true,
}: CustomGaugeProps) {
  const angle = (percent / 100) * 180 - 90

  // Animated counter motion value
  const progress = useSpring(0, { stiffness: 80, damping: 20 })
  const display = useTransform(progress, latest => Math.round(latest))

  // Local state to store displayed number
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    // Subscribe to changes in display and update React state
    const unsubscribe = display.onChange(v => setDisplayValue(v))
    // Start animation to target percent
    progress.set(percent)

    return () => unsubscribe()
  }, [percent, display, progress])

  return (
    <div className="relative" style={{ width: 30, height: 30 }}>
      {/* Arc */}
      <svg viewBox="0 0 100 100" className="absolute top-0 left-0 w-full h-full -translate-y-1">
        {/* Gauge arc */}
        <motion.path
          d="M 10 90 A 40 40 0 0 1 90 90"
          fill="none"
          stroke={strokeColor}
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Tick marks */}
        {showTicks &&
          [0, 50, 100].map((val) => {
            const tickAngle = (val / 100) * 180 - 90
            const radius = 40
            const centerX = 50
            const centerY = 90
            const rad = (tickAngle * Math.PI) / 180
            const x1 = centerX + radius * Math.cos(rad)
            const y1 = centerY + radius * Math.sin(rad)
            const x2 = centerX + (radius - 4) * Math.cos(rad)
            const y2 = centerY + (radius - 4) * Math.sin(rad)
            return (
              <line
                key={val}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={strokeColor}
                strokeWidth="1"
              />
            )
          })}
      </svg>

      {/* Needle */}
      <motion.div
        className="absolute left-1/2 top-[50%] origin-bottom"
        style={{
          width: 1,
          height: 8,
          backgroundColor: needleColor,
          transformOrigin: '50% 100%',
        }}
        animate={{ rotate: angle }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />

      {/* Center Text */}
      <div
        className="absolute left-1/2 top-0 text-foreground text-[10px] font-semibold transform -translate-x-1/2 -translate-y-1"
      >
        {displayValue}
        <span className="text-[10px]">%</span>
      </div>

      {/* Label below */}
      {label && (
        <div
          className="absolute left-1/2 text-foreground bottom-0 text-[10px] font-medium text-center transform -translate-x-1/2 translate-y-1/2"
        >
          {label}
        </div>
      )}
    </div>
  )
}
