// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgJExYI1FQWl7CqKwQhXoi5ys5_FIXzTk",
  authDomain: "hoper-booking.firebaseapp.com",
  projectId: "hoper-booking",
  storageBucket: "hoper-booking.firebasestorage.app",
  messagingSenderId: "511172232861",
  appId: "1:511172232861:web:37c6233afdcdc843963674",
  measurementId: "G-J9F16BS0RE"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.page');
    
    // --- Navigation ---
    const navLinks = document.getElementById('nav-links');
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');
    const loginNavItem = document.getElementById('login-nav-item');
    const logoutNavItem = document.getElementById('logout-nav-item');
    const navLogoutBtn = document.getElementById('nav-logout');
    
    // --- App Buttons & Elements ---
    const googleLoginBtn = document.getElementById('google-login');
    const findRideBtn = document.getElementById('find-ride-btn');
    const bookRideFinalBtn = document.getElementById('book-ride-final-btn');

    // --- Email Form Elements ---
    const emailForm = document.getElementById('email-form');
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    const formTitle = document.getElementById('form-title');
    const signInBtn = document.getElementById('sign-in-btn');
    const createAccountBtn = document.getElementById('create-account-btn');
    const formToggleLink = document.getElementById('form-toggle-link');

    let isSignUpMode = false;

    // --- Mobile Menu Toggle ---
    mobileMenuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    const showPage = (pageId) => {
        pages.forEach(page => page.classList.remove('active'));
        document.getElementById(pageId)?.classList.add('active');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    };

    // --- Authentication Logic ---
    auth.onAuthStateChanged((user) => {
        if (user) {
            showPage('book-ride-page');
            loginNavItem.style.display = 'none';
            logoutNavItem.style.display = 'block';
        } else {
            showPage('login-page');
            loginNavItem.style.display = 'block';
            logoutNavItem.style.display = 'none';
        }
    });

    googleLoginBtn.addEventListener('click', () => { auth.signInWithPopup(googleProvider).catch(handleAuthError); });
    navLogoutBtn.addEventListener('click', (e) => { e.preventDefault(); auth.signOut().catch((error) => console.error('Sign out error', error)); });

    // --- Email/Password Form Logic ---
    formToggleLink.addEventListener('click', (e) => {
        e.preventDefault();
        isSignUpMode = !isSignUpMode;
        if (isSignUpMode) {
            formTitle.textContent = "Create Account";
            signInBtn.style.display = 'none';
            createAccountBtn.style.display = 'block';
            formToggleLink.textContent = "Already have an account? Sign In";
        } else {
            formTitle.textContent = "Sign In";
            signInBtn.style.display = 'block';
            createAccountBtn.style.display = 'none';
            formToggleLink.textContent = "Don't have an account? Sign Up";
        }
    });

    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value;
        const password = passwordInput.value;

        if (isSignUpMode) {
            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    console.log("Account created successfully!", userCredential.user);
                    // Automatically signs in, onAuthStateChanged will handle the rest
                })
                .catch(handleAuthError);
        } else {
            auth.signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    console.log("Signed in successfully!", userCredential.user);
                    // Automatically signs in, onAuthStateChanged will handle the rest
                })
                .catch(handleAuthError);
        }
    });

    function handleAuthError(error) {
        console.error("Authentication Error:", error.code, error.message);
        let message = "An unknown error occurred.";
        switch (error.code) {
            case 'auth/invalid-email':
                message = "Please enter a valid email address.";
                break;
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                message = "Incorrect email or password. Please try again.";
                break;
            case 'auth/email-already-in-use':
                message = "An account with this email already exists. Please sign in.";
                break;
            case 'auth/weak-password':
                message = "Your password must be at least 6 characters long.";
                break;
        }
        alert(message);
    }

    // --- Navigation & App Flow Logic ---
    document.getElementById('nav-home-link').addEventListener('click', (e) => { e.preventDefault(); auth.currentUser ? showPage('book-ride-page') : showPage('login-page'); });
    document.getElementById('nav-ride').addEventListener('click', (e) => { e.preventDefault(); auth.currentUser ? showPage('book-ride-page') : showPage('login-page'); });
    document.getElementById('nav-help').addEventListener('click', (e) => { e.preventDefault(); showPage('help-page'); });
    document.getElementById('nav-services').addEventListener('click', (e) => { e.preventDefault(); showPage('services-page'); });
    document.getElementById('nav-rewards').addEventListener('click', (e) => { e.preventDefault(); showPage('rewards-page'); });
    document.getElementById('nav-about').addEventListener('click', (e) => { e.preventDefault(); showPage('about-us-page'); });

    findRideBtn.addEventListener('click', () => {
        const pickupInput = document.getElementById('pickup-location');
        const dropInput = document.getElementById('drop-location');
        if (pickupInput.value.trim() === '' || dropInput.value.trim() === '') {
            alert('Please enter both pickup and drop locations.');
            return;
        }
        showPage('choose-ride-page');
    });
});