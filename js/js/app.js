import { setupAuthListeners, handleGoogleLogin, handleLogout, handleEmailPassword, handlePasswordReset } from './auth.js';
import { showPage } from './ui.js';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize authentication listeners
    setupAuthListeners();

    // --- Element Variables ---
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');
    const navLinks = document.getElementById('nav-links');
    
    // --- Auth Buttons ---
    const googleLoginBtn = document.getElementById('google-login');
    const navLogoutBtn = document.getElementById('nav-logout');
    
    // --- Email Form ---
    const emailForm = document.getElementById('email-form');
    const formToggleLink = document.getElementById('form-toggle-link');
    const passwordToggleIcon = document.getElementById('password-toggle-icon');
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    let isSignUpMode = false;

    // --- Navigation Links ---
    document.getElementById('nav-home-link').addEventListener('click', (e) => { e.preventDefault(); showPage('book-ride-page'); });
    document.getElementById('nav-ride').addEventListener('click', (e) => { e.preventDefault(); showPage('book-ride-page'); });
    document.getElementById('nav-help').addEventListener('click', (e) => { e.preventDefault(); showPage('help-page'); });
    document.getElementById('nav-services').addEventListener('click', (e) => { e.preventDefault(); showPage('services-page'); });
    document.getElementById('nav-rewards').addEventListener('click', (e) => { e.preventDefault(); showPage('rewards-page'); });
    document.getElementById('nav-about').addEventListener('click', (e) => { e.preventDefault(); showPage('about-us-page'); });

    // --- Event Listeners ---
    mobileMenuIcon.addEventListener('click', () => navLinks.classList.toggle('active'));
    googleLoginBtn.addEventListener('click', handleGoogleLogin);
    navLogoutBtn.addEventListener('click', (e) => { e.preventDefault(); handleLogout(); });

    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email-input').value;
        const password = document.getElementById('password-input').value;
        handleEmailPassword(email, password, isSignUpMode);
    });

    formToggleLink.addEventListener('click', (e) => {
        e.preventDefault();
        isSignUpMode = !isSignUpMode;
        document.getElementById('form-title').textContent = isSignUpMode ? "Create Account" : "Sign In";
        document.getElementById('sign-in-btn').style.display = isSignUpMode ? 'none' : 'block';
        document.getElementById('create-account-btn').style.display = isSignUpMode ? 'block' : 'none';
        e.target.textContent = isSignUpMode ? "Already have an account? Sign In" : "Don't have an account? Sign Up";
        forgotPasswordLink.style.display = isSignUpMode ? 'none' : 'block';
    });

    passwordToggleIcon.addEventListener('click', () => {
        const passwordInput = document.getElementById('password-input');
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        passwordToggleIcon.classList.toggle('fa-eye');
        passwordToggleIcon.classList.toggle('fa-eye-slash');
    });

    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        const email = prompt("Please enter your email to receive a password reset link:");
        handlePasswordReset(email);
    });
});
