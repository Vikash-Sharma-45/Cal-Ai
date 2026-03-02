// ============================================
// CAL AI — SIMPLE HASH ROUTER
// ============================================

const routes = {};
let currentPage = null;
let appContainer = null;

export function registerRoute(path, renderFn) {
    routes[path] = renderFn;
}

export function navigate(path) {
    window.location.hash = path;
}

export function getCurrentRoute() {
    return window.location.hash.slice(1) || '/';
}

function handleRouteChange() {
    const path = getCurrentRoute();
    const renderFn = routes[path] || routes['/'];

    if (!renderFn || !appContainer) return;

    // Animate out current page
    const currentPageEl = appContainer.querySelector('.page');
    if (currentPageEl) {
        currentPageEl.classList.add('page-exit');
        setTimeout(() => {
            renderPage(renderFn);
        }, 200);
    } else {
        renderPage(renderFn);
    }
}

function renderPage(renderFn) {
    const content = renderFn();
    appContainer.innerHTML = '';

    if (typeof content === 'string') {
        appContainer.innerHTML = content;
    } else if (content instanceof HTMLElement) {
        appContainer.appendChild(content);
    }

    // Animate in new page
    const newPage = appContainer.querySelector('.page');
    if (newPage) {
        newPage.classList.add('page-enter');
    }

    // Nav is attached by main.js renderWithNav wrapper
}

export function initRouter(container) {
    appContainer = container;
    window.addEventListener('hashchange', handleRouteChange);
    handleRouteChange();
}

export { appContainer };
