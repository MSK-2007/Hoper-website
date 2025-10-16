// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAN2oL3U1gMYOn7-WqgnEE719yaLoii8jA",
  authDomain: "hoper-cf7e8.firebaseapp.com",
  projectId: "hoper-cf7e8",
  storageBucket: "hoper-cf7e8.appspot.com",
  messagingSenderId: "873807430355",
  appId: "1:873807430355:web:a60afb7d06f884f80f0a26",
  measurementId: "G-9VCJ6GM2EX"
};

firebase.initializeApp(firebaseConfig);

// Export auth and db services
export const auth = firebase.auth();
export const db = firebase.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
