

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDkeMHjKPXAOeHYDZPnWEzMJFmNN3bmSmE",
    authDomain: "spendspot-7aff1.firebaseapp.com",
    projectId: "spendspot-7aff1",
    storageBucket: "spendspot-7aff1.appspot.com",
    messagingSenderId: "590840142636",
    appId: "1:590840142636:web:629381210c549658baea89",
    measurementId: "G-2E9XDYV5YR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth, signInWithEmailAndPassword, signOut };