import React from 'react';

export default function CircularProgressRing({ progress = 100, children, isRunning = false }) {
  const size = 320;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Clamped progress offset (0 to 100)
  const clampedProgress = Math.max(0, Math.min(100, progress));
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;

  return (
    <div className={`ring-wrapper ${isRunning ? 'pulse-anim' : ''}`}>
      <svg className="ring-svg" viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--accent-cyan)" />
          </linearGradient>
        </defs>

        {/* Background track circle */}
        <circle
          className="ring-circle-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />

        {/* Dynamic progress circle */}
        <circle
          className="ring-circle-progress"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#ringGradient)"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>

      {/* Inner Children (Digital Display) */}
      <div className="ring-inner-content">
        {children}
      </div>
    </div>
  );
}
