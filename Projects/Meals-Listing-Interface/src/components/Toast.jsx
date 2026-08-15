import React from 'react';
import { Sparkles, CheckCircle, Info } from 'lucide-react';

export default function Toast({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast">
          <CheckCircle size={18} className="text-emerald-400" />
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
