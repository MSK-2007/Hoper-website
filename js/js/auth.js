import { auth, googleProvider } from './firebase-config.js';
import { showPage, updateNavUI } from './ui.js';

export function setupAuthListeners() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            showPage('book-ride-page');
        } else {
            showPage('login-page');
        }
        updateNavUI(user);
    });
}

export function handleGoogleLogin() {
    auth.signInWithPopup(googleProvider).catch(handleAuthError);
}

export function handleLogout() {
    auth.signOut().catch(error => console.error('Sign out error', error));
}

export function handleEmailPassword(email, password, isSignUpMode) {
    if (isSignUpMode) {
        auth.createUserWithEmailAndPassword(email, password).catch(handleAuthError);
    } else {
        auth.signInWithEmailAndPassword(email, password).catch(handleAuthError);
    }
}

export function handlePasswordReset(email) {
    if (email) {
        auth.sendPasswordResetEmail(email)
            .then(() => alert("Password reset email sent! Please check your inbox."))
            .catch(handleAuthError);
    }
}

function handleAuthError(error) {
    console.error("Authentication Error:", error.code, error.message);
    let message = "An unknown error occurred.";
    switch (error.code) {
        case 'auth/invalid-email': message = "Please enter a valid email address."; break;
        case 'auth/user-not-found':
        case 'auth/wrong-password': message = "Incorrect email or password."; break;
        case 'auth/email-already-in-use': message = "An account with this email already exists."; break;
        case 'auth/weak-password': message = "Password must be at least 6 characters long."; break;
    }
    alert(message);
}
