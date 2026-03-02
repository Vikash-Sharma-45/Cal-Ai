// ============================================
// CAL AI — TOAST NOTIFICATIONS
// ============================================

export function showToast(message, type = 'success', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
        warning: '⚠️',
    };

    const toast = document.createElement('div');
    toast.className = `toast toast--${type} toast-enter`;
    toast.innerHTML = `
    <span class="toast__icon">${icons[type] || icons.info}</span>
    <span class="toast__message">${message}</span>
  `;
    toast.style.pointerEvents = 'auto';

    container.appendChild(toast);

    // Auto dismiss
    setTimeout(() => {
        toast.classList.remove('toast-enter');
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 300);
    }, duration);

    // Click to dismiss
    toast.addEventListener('click', () => {
        toast.classList.remove('toast-enter');
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 300);
    });
}

export const toastStyles = `
  .toast {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    backdrop-filter: blur(12px);
    cursor: pointer;
    box-shadow: var(--shadow-lg);
  }
  .toast--success { border-color: rgba(34, 197, 94, 0.3); }
  .toast--error { border-color: rgba(239, 68, 68, 0.3); }
  .toast--warning { border-color: rgba(249, 115, 22, 0.3); }
  .toast--info { border-color: rgba(59, 130, 246, 0.3); }
  .toast__icon { font-size: 1.1rem; }
  .toast__message {
    font-size: var(--font-sm);
    font-weight: 500;
  }
`;
