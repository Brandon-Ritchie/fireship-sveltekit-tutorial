// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { derived, writable } from 'svelte/store';
import type { Readable } from 'svelte/store';

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

/*
 * @returns a story with the current firebase user
 */
function userStore(): Readable<User | null> {
	let unsubscribe: () => void;

	if (!auth || !globalThis.window) {
		console.warn('Auth is not initialized or not in browser');
		const { subscribe } = writable<User | null>(null);
		return {
			subscribe
		};
	}

	const { subscribe } = writable<User | null>(auth?.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(auth, (user) => {
			set(user);
		});

		return () => unsubscribe();
	});

	return {
		subscribe
	};
}

export const user = userStore();

export function docStore<T>(path: string) {
	let unsubscribe: () => void;

	const docRef = doc(db, path);

	const { subscribe } = writable<T | null>(null, (set) => {
		unsubscribe = onSnapshot(docRef, (doc) => {
			set((doc.data() as T) ?? null);
		});
		return () => unsubscribe();
	});

	return {
		subscribe,
		ref: docRef,
		id: docRef.id
	};
}

interface UserData {
	username: string;
	bio: string;
	photoURL: string;
	links: any[];
}

export const userData: Readable<UserData | null> = derived(user, ($user, set) => {
	if ($user) {
		return docStore<UserData>(`users/${$user.uid}`).subscribe(set);
	} else {
		set(null);
	}
});
