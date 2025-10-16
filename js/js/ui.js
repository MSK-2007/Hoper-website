const pages = document.querySelectorAll('.page');
const navLinks = document.getElementById('nav-links');
const loginNavItem = document.getElementById('login-nav-item');
const logoutNavItem = document.getElementById('logout-nav-item');

export function showPage(pageId) {
    pages.forEach(page => page.classList.remove('active'));
    const pageToShow = document.getElementById(pageId);
    if (pageToShow) {
        pageToShow.classList.add('active');
    }
    if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
}

export function updateNavUI(user) {
    if (user) {
        loginNavItem.style.display = 'none';
        logoutNavItem.style.display = 'block';
    } else {
        loginNavItem.style.display = 'block';
        logoutNavItem.style.display = 'none';
    }
}
