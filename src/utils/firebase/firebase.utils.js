import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCJOyx_WLXGfsKeyNVUMhpj5AWM0rnpRUg",
  authDomain: "crwn-clothing-db-6039c.firebaseapp.com",
  projectId: "crwn-clothing-db-6039c",
  storageBucket: "crwn-clothing-db-6039c.appspot.com",
  messagingSenderId: "158477307585",
  appId: "1:158477307585:web:4dacb0b985f6d965ee0e40"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
  
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
       await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
       });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }

    return userDocRef;
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  }