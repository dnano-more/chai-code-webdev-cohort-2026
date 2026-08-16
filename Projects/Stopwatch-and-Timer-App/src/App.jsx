import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Stopwatch from './components/Stopwatch';
import CountdownTimer from './components/CountdownTimer';
import ShortcutsModal from './components/ShortcutsModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('stopwatch');
  const [theme, setTheme] = useState(() => localStorage.getItem('chrono_theme') || 'dark');
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('chrono_sound');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  // Sync theme attribute on <html> element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('chrono_theme', theme);
  }, [theme]);

  // Sync sound preference
  useEffect(() => {
    localStorage.setItem('chrono_sound', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  // Request Desktop Notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts when focused inside an input element
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        // Toggle play/pause via button click simulate
        const ctrlBtn = document.querySelector('.btn-ctrl-primary, .btn-ctrl-pause');
        if (ctrlBtn) ctrlBtn.click();
      } else if (e.code === 'KeyL' && activeTab === 'stopwatch') {
        e.preventDefault();
        const lapBtn = document.querySelector('.controls-bar .btn-ctrl-secondary:last-child');
        if (lapBtn) lapBtn.click();
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        const resetBtn = document.querySelector('.controls-bar .btn-ctrl-secondary:first-child');
        if (resetBtn) resetBtn.click();
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        setSoundEnabled((prev) => !prev);
      } else if (e.code === 'KeyT') {
        e.preventDefault();
        setActiveTab((prev) => (prev === 'stopwatch' ? 'timer' : 'stopwatch'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab]);

  return (
    <div className="app-container">
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {activeTab === 'stopwatch' ? (
          <Stopwatch soundEnabled={soundEnabled} />
        ) : (
          <CountdownTimer soundEnabled={soundEnabled} />
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          padding: '1.5rem 0',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.85rem',
          borderTop: '1px solid var(--navbar-border)',
        }}
      >
        <p>ChronoPulse • High Precision Stopwatch & Countdown Timer</p>
        <p style={{ fontSize: '0.75rem', marginTop: '0.2rem' }}>
          Press <kbd style={{ fontFamily: 'var(--font-mono)', background: 'var(--bg-tertiary)', padding: '2px 6px', borderRadius: '4px' }}>Spacebar</kbd> to Start/Pause
        </p>
      </footer>

      {/* Keyboard Shortcuts Modal */}
      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
}
