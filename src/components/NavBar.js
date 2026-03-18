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
  /* ── Bottom Nav (mobile & tablet) ── */
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: var(--nav-height);
    background: rgba(13, 13, 15, 0.9);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-top: 1px solid var(--border-subtle);
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 var(--space-2);
    z-index: 100;
  }

  @media (min-width: 768px) {
    .bottom-nav {
      max-width: 720px;
      left: 50%;
      right: auto;
      transform: translateX(-50%);
    }
  }

  /* ── Sidebar Nav (desktop 1100px+) ── */
  @media (min-width: 1100px) {
    .bottom-nav {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: auto;
      transform: none;
      width: var(--sidebar-width);
      max-width: var(--sidebar-width);
      height: 100vh;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      border-top: none;
      border-right: 1px solid var(--border-subtle);
      padding: var(--space-6) var(--space-4);
      gap: var(--space-2);
    }

    .bottom-nav::before {
      content: '🔥 Cal AI';
      display: block;
      font-size: var(--font-lg);
      font-weight: 800;
      letter-spacing: -0.02em;
      background: var(--accent-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      padding: var(--space-2) var(--space-3);
      margin-bottom: var(--space-6);
    }
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

  @media (min-width: 1100px) {
    .bottom-nav__item {
      flex-direction: row;
      gap: var(--space-3);
      padding: var(--space-3) var(--space-4);
      align-items: center;
    }
  }

  .bottom-nav__item:hover {
    background: var(--bg-card);
  }
  .bottom-nav__item.active .bottom-nav__label {
    color: var(--accent-primary);
  }

  @media (min-width: 1100px) {
    .bottom-nav__item.active {
      background: rgba(163, 230, 53, 0.08);
      border: 1px solid var(--border-accent);
    }
    .bottom-nav__item.active .bottom-nav__label {
      color: var(--accent-primary);
    }
  }

  .bottom-nav__item--primary {
    margin-top: -20px;
  }

  @media (min-width: 1100px) {
    .bottom-nav__item--primary {
      margin-top: 0;
      order: -1;
    }
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

  @media (min-width: 1100px) {
    .bottom-nav__item--primary .bottom-nav__icon {
      width: 36px;
      height: 36px;
      font-size: 1.1rem;
    }
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
    flex-shrink: 0;
  }
  .bottom-nav__label {
    font-size: 0.625rem;
    font-weight: 500;
    color: var(--text-muted);
    transition: color var(--duration-fast) var(--ease-out);
  }

  @media (min-width: 1100px) {
    .bottom-nav__label {
      font-size: var(--font-sm);
      font-weight: 500;
    }
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

  @media (min-width: 1100px) {
    .bottom-nav__indicator {
      display: none;
    }
  }
`;
