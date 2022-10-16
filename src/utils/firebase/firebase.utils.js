import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCJOyx_WLXGfsKeyNVUMhpj5AWM0rnpRUg",
  authDomain: "crwn-clothing-db-6039c.firebaseapp.com",
  projectId: "crwn-clothing-db-6039c",
  storageBucket: "crwn-clothing-db-6039c.appspot.com",
  messagingSenderId: "158477307585",
  appId: "1:158477307585:web:4dacb0b985f6d965ee0e40"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  