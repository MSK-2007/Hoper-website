const firebaseConfig = {
  apiKey: "AIzaSyAN2oL3U1gMYOn7-WqgnEE719yaLoii8jA",
  authDomain: "hoper-cf7e8.firebaseapp.com",
  projectId: "hoper-cf7e8",
  storageBucket: "hoper-cf7e8.appspot.com",
  messagingSenderId: "873807430355",
  appId: "1:873807430355:web:a60afb7d06f884f80f0a26"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.page');
    const findRideBtn = document.getElementById('find-ride-btn');
    const googleLoginBtn = document.getElementById('google-login');
    const navLogoutBtn = document.getElementById('nav-logout');
    const loginNavItem = document.getElementById('login-nav-item');
    const logoutNavItem = document.getElementById('logout-nav-item');
    const bookRideFinalBtn = document.getElementById('book-ride-final-btn');
    const rideOptionsContainer = document.getElementById('ride-options-container');
    const searchingUI = document.getElementById('searching-ui');
    const cancelSearchBtn = document.getElementById('cancel-search-btn');
    const rideCards = document.querySelectorAll('.ride-card');
    
    let searchTimeout;

    const showPage = (pageId) => {
        pages.forEach(page => page.classList.remove('active'));
        const pageToShow = document.getElementById(pageId);
        if(pageToShow) pageToShow.classList.add('active');
    };

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

    googleLoginBtn.addEventListener('click', () => {
        auth.signInWithPopup(googleProvider).catch(error => console.error(error));
    });
    
    navLogoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut().catch((error) => console.error('Sign out error', error));
    });

    findRideBtn.addEventListener('click', () => {
        const pickupInput = document.getElementById('pickup-location');
        const dropInput = document.getElementById('drop-location');
        if (pickupInput.value.trim() === '' || dropInput.value.trim() === '') {
            alert('Please enter both pickup and drop locations.');
            return;
        }
        showPage('choose-ride-page');
    });
    
    rideCards.forEach(card => {
        card.addEventListener('click', () => {
            rideCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
        });
    });

    bookRideFinalBtn.addEventListener('click', () => {
        if (!document.querySelector('.ride-card.selected')) {
            alert('Please select a ride first.');
            return;
        }

        rideOptionsContainer.style.display = 'none';
        searchingUI.style.display = 'block';
        
        searchTimeout = setTimeout(() => {
            alert("We've found a rider for you!");
            rideOptionsContainer.style.display = 'block';
            searchingUI.style.display = 'none';
        }, 5000);
    });

    cancelSearchBtn.addEventListener('click', () => {
        clearTimeout(searchTimeout);
        alert("Search canceled.");
        rideOptionsContainer.style.display = 'block';
        searchingUI.style.display = 'none';
    });
});