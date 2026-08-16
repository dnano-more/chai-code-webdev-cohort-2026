import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Bell, Sparkles } from 'lucide-react';
import CircularProgressRing from './CircularProgressRing';
import { playClickSound, playAlarmSound } from '../services/soundService';

export default function CountdownTimer({ soundEnabled }) {
  // Input duration state (in seconds)
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(5);
  const [inputSeconds, setInputSeconds] = useState(0);

  // Active Timer state (in milliseconds)
  const [totalDurationMs, setTotalDurationMs] = useState(5 * 60 * 1000);
  const [remainingTimeMs, setRemainingTimeMs] = useState(5 * 60 * 1000);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const endTimeRef = useRef(0);
  const animFrameRef = useRef(null);

  // Sync total duration whenever inputs change (when not running)
  useEffect(() => {
    if (!isRunning) {
      const totalSec = inputHours * 3600 + inputMinutes * 60 + inputSeconds;
      const ms = totalSec * 1000;
      setTotalDurationMs(ms);
      setRemainingTimeMs(ms);
      setIsFinished(false);
    }
  }, [inputHours, inputMinutes, inputSeconds, isRunning]);

  // Main countdown loop using requestAnimationFrame & performance.now()
  useEffect(() => {
    if (isRunning) {
      endTimeRef.current = performance.now() + remainingTimeMs;

      const updateCountdown = () => {
        const now = performance.now();
        const left = Math.max(0, endTimeRef.current - now);

        setRemainingTimeMs(left);

        if (left <= 0) {
          setIsRunning(false);
          setIsFinished(true);
          playAlarmSound(soundEnabled);

          // Request browser desktop notification if supported
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('ChronoPulse Timer', {
              body: '⏰ Timer Finished!',
              icon: '/favicon.svg',
            });
          }
        } else {
          animFrameRef.current = requestAnimationFrame(updateCountdown);
        }
      };

      animFrameRef.current = requestAnimationFrame(updateCountdown);
    } else {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    }

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isRunning]);

  // Start / Pause
  const handleTogglePlay = () => {
    playClickSound(soundEnabled);
    if (remainingTimeMs <= 0) return;
    setIsFinished(false);
    setIsRunning((prev) => !prev);
  };

  // Reset
  const handleReset = () => {
    playClickSound(soundEnabled);
    setIsRunning(false);
    setIsFinished(false);
    const totalSec = inputHours * 3600 + inputMinutes * 60 + inputSeconds;
    const ms = totalSec * 1000;
    setTotalDurationMs(ms);
    setRemainingTimeMs(ms);
  };

  // Set Preset Time
  const applyPreset = (h, m, s) => {
    playClickSound(soundEnabled);
    setIsRunning(false);
    setIsFinished(false);
    setInputHours(h);
    setInputMinutes(m);
    setInputSeconds(s);
  };

  // Format time (HH:MM:SS)
  const formatTimerDigits = (ms) => {
    const totalSec = Math.ceil(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;

    const pad = (n) => String(n).padStart(2, '0');

    if (h > 0) {
      return `${pad(h)}:${pad(m)}:${pad(s)}`;
    }
    return `${pad(m)}:${pad(s)}`;
  };

  // Calculate progress percentage (100 -> 0)
  const progressPercent = totalDurationMs > 0 ? (remainingTimeMs / totalDurationMs) * 100 : 0;

  return (
    <div className={`timer-view-section ${isFinished ? 'timer-finished-pulse' : ''}`}>
      {/* SVG Circular Ring */}
      <CircularProgressRing progress={progressPercent} isRunning={isRunning}>
        <div className="digital-time">
          <span>{formatTimerDigits(remainingTimeMs)}</span>
        </div>
        <div className="digital-sublabel">
          {isFinished ? '⏰ Time Is Up!' : isRunning ? 'Counting Down' : remainingTimeMs > 0 ? 'Timer Ready' : 'Set Duration'}
        </div>
      </CircularProgressRing>

      {/* Preset Pills */}
      {!isRunning && (
        <div className="presets-grid" style={{ marginTop: '1.5rem' }}>
          <button className="preset-pill" onClick={() => applyPreset(0, 1, 0)}>
            +1 min
          </button>
          <button className="preset-pill" onClick={() => applyPreset(0, 5, 0)}>
            +5 min
          </button>
          <button className="preset-pill" onClick={() => applyPreset(0, 10, 0)}>
            +10 min
          </button>
          <button className="preset-pill" onClick={() => applyPreset(0, 25, 0)}>
            25m Pomodoro
          </button>
          <button className="preset-pill" onClick={() => applyPreset(1, 0, 0)}>
            1 Hour
          </button>
        </div>
      )}

      {/* Custom Duration Inputs (when not running) */}
      {!isRunning && (
        <div className="time-input-group">
          <div className="time-box">
            <input
              type="number"
              min="0"
              max="99"
              className="time-input-field"
              value={inputHours}
              onChange={(e) => setInputHours(Math.max(0, parseInt(e.target.value) || 0))}
            />
            <span className="time-box-label">Hours</span>
          </div>

          <span className="time-separator">:</span>

          <div className="time-box">
            <input
              type="number"
              min="0"
              max="59"
              className="time-input-field"
              value={inputMinutes}
              onChange={(e) => setInputMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
            />
            <span className="time-box-label">Mins</span>
          </div>

          <span className="time-separator">:</span>

          <div className="time-box">
            <input
              type="number"
              min="0"
              max="59"
              className="time-input-field"
              value={inputSeconds}
              onChange={(e) => setInputSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
            />
            <span className="time-box-label">Secs</span>
          </div>
        </div>
      )}

      {/* Control Buttons Bar */}
      <div className="controls-bar">
        {/* Reset Button */}
        <button
          className="btn-ctrl btn-ctrl-secondary"
          onClick={handleReset}
          disabled={!isRunning && remainingTimeMs === totalDurationMs && !isFinished}
          style={{ opacity: !isRunning && remainingTimeMs === totalDurationMs && !isFinished ? 0.5 : 1 }}
          title="Reset Timer (R)"
        >
          <RotateCcw size={18} />
          <span>Reset</span>
        </button>

        {/* Start / Pause Button */}
        <button
          className={`btn-ctrl ${isRunning ? 'btn-ctrl-pause' : 'btn-ctrl-primary'}`}
          onClick={handleTogglePlay}
          disabled={totalDurationMs <= 0}
          style={{ opacity: totalDurationMs <= 0 ? 0.5 : 1 }}
          title="Start / Pause Timer (Spacebar)"
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
          <span>{isRunning ? 'Pause' : remainingTimeMs < totalDurationMs && remainingTimeMs > 0 ? 'Resume' : 'Start'}</span>
        </button>
      </div>
    </div>
  );
}
