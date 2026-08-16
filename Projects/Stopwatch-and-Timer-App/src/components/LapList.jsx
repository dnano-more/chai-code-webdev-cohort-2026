import React from 'react';
import { Flag, Trash2, Award, AlertCircle } from 'lucide-react';

export default function LapList({ laps, onClearLaps, formatTime }) {
  if (!laps || laps.length === 0) return null;

  // Calculate lap durations
  const lapTimes = laps.map((lap) => lap.duration);

  // Find min and max lap durations if 2 or more laps exist
  let minTime = Infinity;
  let maxTime = -Infinity;

  if (laps.length >= 2) {
    minTime = Math.min(...lapTimes);
    maxTime = Math.max(...lapTimes);
  }

  return (
    <div className="laps-container">
      {/* Header */}
      <div className="laps-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
          <Flag size={18} className="text-blue-500" />
          <span>Lap History ({laps.length})</span>
        </div>
        <button
          className="icon-btn text-rose-500"
          onClick={onClearLaps}
          title="Clear Laps"
          style={{ width: '2rem', height: '2rem' }}
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Lap Table Header */}
      <div
        style={{
          display: 'flex',
          justify: 'space-between',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          padding: '0 0.5rem 0.5rem',
        }}
      >
        <span>Lap #</span>
        <span>Split Time</span>
        <span>Total Time</span>
      </div>

      {/* Lap Rows (newest first) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', maxHeight: '240px', overflowY: 'auto' }}>
        {laps.map((lap) => {
          const isFastest = laps.length >= 2 && lap.duration === minTime;
          const isSlowest = laps.length >= 2 && lap.duration === maxTime;

          let statusClass = '';
          if (isFastest) statusClass = 'fastest';
          if (isSlowest) statusClass = 'slowest';

          return (
            <div key={lap.id} className={`lap-row ${statusClass}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: 700, minWidth: '2.5rem' }}>#{lap.number}</span>
                {isFastest && <span className="lap-badge fastest">Fastest</span>}
                {isSlowest && <span className="lap-badge slowest">Slowest</span>}
              </div>

              <span>+{formatTime(lap.duration, true)}</span>
              <span style={{ color: 'var(--text-muted)' }}>{formatTime(lap.totalTime, true)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
