import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';
import CircularProgressRing from './CircularProgressRing';
import LapList from './LapList';
import { playClickSound, playLapSound } from '../services/soundService';

export default function Stopwatch({ soundEnabled }) {
  const [time, setTime] = useState(0); // Elapsed milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const startTimeRef = useRef(0);
  const accumulatedTimeRef = useRef(0);
  const animFrameRef = useRef(null);

  // Update loop using performance.now()
  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = performance.now() - accumulatedTimeRef.current;

      const updateTimer = () => {
        const now = performance.now();
        const elapsed = now - startTimeRef.current;
        accumulatedTimeRef.current = elapsed;
        setTime(elapsed);
        animFrameRef.current = requestAnimationFrame(updateTimer);
      };

      animFrameRef.current = requestAnimationFrame(updateTimer);
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

  // Start / Pause toggle
  const handleTogglePlay = () => {
    playClickSound(soundEnabled);
    setIsRunning((prev) => !prev);
  };

  // Reset
  const handleReset = () => {
    playClickSound(soundEnabled);
    setIsRunning(false);
    accumulatedTimeRef.current = 0;
    setTime(0);
    setLaps([]);
  };

  // Record Lap
  const handleLap = () => {
    if (!isRunning && time === 0) return;
    playLapSound(soundEnabled);

    const previousTotalTime = laps.length > 0 ? laps[0].totalTime : 0;
    const lapDuration = time - previousTotalTime;

    const newLap = {
      id: Date.now(),
      number: laps.length + 1,
      duration: lapDuration,
      totalTime: time,
    };

    setLaps((prev) => [newLap, ...prev]);
  };

  // Format time (MM:SS.ms or HH:MM:SS.ms)
  const formatTime = (ms, includeMs = true) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);

    const pad = (n) => String(n).padStart(2, '0');

    const minutesStr = pad(minutes);
    const secondsStr = pad(seconds);
    const msStr = pad(milliseconds);

    if (hours > 0) {
      const hoursStr = pad(hours);
      return includeMs
        ? `${hoursStr}:${minutesStr}:${secondsStr}.${msStr}`
        : `${hoursStr}:${minutesStr}:${secondsStr}`;
    }

    return includeMs
      ? `${minutesStr}:${secondsStr}.${msStr}`
      : `${minutesStr}:${secondsStr}`;
  };

  // Calculate sweep percentage of current minute (0 - 100)
  const currentSecondsMs = time % 60000;
  const sweepProgress = (currentSecondsMs / 60000) * 100;

  // Split formatted time into main digits and milliseconds
  const timeFormatted = formatTime(time, true);
  const mainPart = timeFormatted.slice(0, -3);
  const msPart = timeFormatted.slice(-2);

  return (
    <div className="timer-view-section">
      {/* SVG Circular Ring */}
      <CircularProgressRing progress={sweepProgress} isRunning={isRunning}>
        <div className="digital-time">
          <span>{mainPart}</span>
          <span className="ms-digits">.{msPart}</span>
        </div>
        <div className="digital-sublabel">
          {isRunning ? 'Stopwatch Active' : time > 0 ? 'Paused' : 'Stopwatch Ready'}
        </div>
      </CircularProgressRing>

      {/* Control Buttons Bar */}
      <div className="controls-bar">
        {/* Reset Button */}
        <button
          className="btn-ctrl btn-ctrl-secondary"
          onClick={handleReset}
          disabled={time === 0 && !isRunning}
          style={{ opacity: time === 0 && !isRunning ? 0.5 : 1 }}
          title="Reset Stopwatch (R)"
        >
          <RotateCcw size={18} />
          <span>Reset</span>
        </button>

        {/* Start / Pause Button */}
        <button
          className={`btn-ctrl ${isRunning ? 'btn-ctrl-pause' : 'btn-ctrl-primary'}`}
          onClick={handleTogglePlay}
          title="Start / Pause Stopwatch (Spacebar)"
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
          <span>{isRunning ? 'Pause' : time > 0 ? 'Resume' : 'Start'}</span>
        </button>

        {/* Lap Button */}
        <button
          className="btn-ctrl btn-ctrl-secondary"
          onClick={handleLap}
          disabled={!isRunning}
          style={{ opacity: !isRunning ? 0.5 : 1 }}
          title="Record Lap (L)"
        >
          <Flag size={18} />
          <span>Lap</span>
        </button>
      </div>

      {/* Lap History List */}
      <LapList
        laps={laps}
        onClearLaps={() => setLaps([])}
        formatTime={formatTime}
      />
    </div>
  );
}
