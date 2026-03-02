// ============================================
// CAL AI — BOTTOM NAVIGATION BAR
// ============================================

import { navigate, getCurrentRoute } from '../utils/router.js';

const NAV_ITEMS = [
    { path: '/dashboard', label: 'Home', icon: '🏠' },
    { path: '/search', label: 'Search', icon: '🔍' },
    { path: '/log', label: 'Scan', icon: '📸', primary: true },
    { path: '/progress', label: 'Progress', icon: '📊' },
    { path: '/profile', label: 'Profile', icon: '👤' },
];

export function createNavBar() {
    const nav = document.createElement('nav');
    nav.className = 'bottom-nav';
    nav.id = 'bottom-nav';

    const currentRoute = getCurrentRoute();

    nav.innerHTML = NAV_ITEMS.map(item => `
    <button
      class="bottom-nav__item ${currentRoute === item.path ? 'active' : ''} ${item.primary ? 'bottom-nav__item--primary' : ''}"
      data-path="${item.path}"
      id="nav-${item.label.toLowerCase()}"
    >
      <span class="bottom-nav__icon">${item.icon}</span>
      <span class="bottom-nav__label">${item.label}</span>
      ${currentRoute === item.path ? '<span class="bottom-nav__indicator"></span>' : ''}
    </button>
  `).join('');

    nav.addEventListener('click', (e) => {
        const btn = e.target.closest('.bottom-nav__item');
        if (!btn) return;
        const path = btn.dataset.path;
        if (path) navigate(path);
    });

    return nav;
}

export function updateNavBar() {
    const nav = document.getElementById('bottom-nav');
    if (!nav) return;

    const currentRoute = getCurrentRoute();
    nav.querySelectorAll('.bottom-nav__item').forEach(btn => {
        const isActive = btn.dataset.path === currentRoute;
        btn.classList.toggle('active', isActive);
        const indicator = btn.querySelector('.bottom-nav__indicator');
        if (isActive && !indicator) {
            const dot = document.createElement('span');
            dot.className = 'bottom-nav__indicator';
            btn.appendChild(dot);
        } else if (!isActive && indicator) {
            indicator.remove();
        }
    });
}

export const navBarStyles = `
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: var(--max-width);
    height: var(--nav-height);
    background: rgba(13, 13, 15, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-top: 1px solid var(--border-subtle);
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 var(--space-2);
    z-index: 100;
  }
  .bottom-nav__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    transition: all var(--duration-fast) var(--ease-out);
    position: relative;
    -webkit-tap-highlight-color: transparent;
  }
  .bottom-nav__item:hover {
    background: var(--bg-card);
  }
  .bottom-nav__item.active .bottom-nav__label {
    color: var(--accent-primary);
  }
  .bottom-nav__item--primary {
    margin-top: -20px;
  }
  .bottom-nav__item--primary .bottom-nav__icon {
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--accent-gradient);
    border-radius: var(--radius-full);
    font-size: 1.4rem;
    box-shadow: var(--shadow-glow);
    transition: box-shadow var(--duration-normal) var(--ease-out), transform var(--duration-fast) var(--ease-out);
  }
  .bottom-nav__item--primary:hover .bottom-nav__icon {
    box-shadow: var(--shadow-glow-strong);
    transform: scale(1.05);
  }
  .bottom-nav__item--primary:active .bottom-nav__icon {
    transform: scale(0.95);
  }
  .bottom-nav__icon {
    font-size: 1.25rem;
    line-height: 1;
  }
  .bottom-nav__label {
    font-size: 0.625rem;
    font-weight: 500;
    color: var(--text-muted);
    transition: color var(--duration-fast) var(--ease-out);
  }
  .bottom-nav__indicator {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 3px;
    background: var(--accent-gradient);
    border-radius: var(--radius-full);
    animation: scaleIn 0.3s var(--ease-spring) both;
  }
`;
