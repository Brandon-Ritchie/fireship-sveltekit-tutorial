// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyA4VOHKzLKSveRdblWOcnL5N3Iz3J5XX1k',
	authDomain: 'fireship-sveltekit-tutorial.firebaseapp.com',
	projectId: 'fireship-sveltekit-tutorial',
	storageBucket: 'fireship-sveltekit-tutorial.appspot.com',
	messagingSenderId: '803716999161',
	appId: '1:803716999161:web:6a061c3c9f3ce71762ff28'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
