import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBdXqIXmmNqKQWgXvm87tbVTlrFYFa10YQ",
  authDomain: "nekosshop-d688c.firebaseapp.com",
  projectId: "nekosshop-d688c",
  storageBucket: "nekosshop-d688c.firebasestorage.app",
  messagingSenderId: "601866612932",
  appId: "1:601866612932:web:d72d2dabd76c4fbb9ed991",
  measurementId: "G-9XB0HV436J"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Initialize Firestore
const db = getFirestore(app);

// Enable offline persistence for Firestore
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Offline persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser does not support all of the features required to enable offline persistence.');
    }
  });
}

// Initialize Analytics only in browser environment
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { auth, googleProvider, analytics, db };
