import React from 'react';
import { Timer, Watch, Volume2, VolumeX, Sun, Moon, Keyboard } from 'lucide-react';

export default function Header({
  activeTab,
  onTabChange,
  soundEnabled,
  onToggleSound,
  theme,
  onToggleTheme,
  onOpenShortcuts,
}) {
  return (
    <header className="header-bar">
      {/* Brand Logo */}
      <div className="brand-title">
        <div className="brand-icon">
          <Watch size={20} />
        </div>
        <span>ChronoPulse</span>
      </div>

      {/* Tab Switcher */}
      <div className="tabs-switcher">
        <button
          className={`tab-btn ${activeTab === 'stopwatch' ? 'active' : ''}`}
          onClick={() => onTabChange('stopwatch')}
        >
          <Watch size={16} />
          <span>Stopwatch</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'timer' ? 'active' : ''}`}
          onClick={() => onTabChange('timer')}
        >
          <Timer size={16} />
          <span>Timer</span>
        </button>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {/* Keyboard Shortcuts */}
        <button
          className="icon-btn"
          onClick={onOpenShortcuts}
          title="Keyboard Shortcuts (Spacebar, L, R)"
          aria-label="Keyboard Shortcuts"
        >
          <Keyboard size={18} />
        </button>

        {/* Audio Mute/Unmute */}
        <button
          className="icon-btn"
          onClick={onToggleSound}
          title={soundEnabled ? 'Mute Audio Chimes' : 'Unmute Audio Chimes'}
          aria-label="Toggle Sound"
        >
          {soundEnabled ? <Volume2 size={18} className="text-blue-500" /> : <VolumeX size={18} className="text-gray-400" />}
        </button>

        {/* Theme Toggle */}
        <button
          className="icon-btn"
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
