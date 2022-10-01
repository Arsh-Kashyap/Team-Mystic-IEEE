import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzMq4Pjira4jArVr4MVenmiXpbk71BqZs",
  authDomain: "chitchat-790ff.firebaseapp.com",
  projectId: "chitchat-790ff",
  storageBucket: "chitchat-790ff.appspot.com",
  messagingSenderId: "504985005035",
  appId: "1:504985005035:web:5fad36361b249ebd70c7ae",
  measurementId: "G-RKF2PZEJRF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
const analytics = getAnalytics(app);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = (setUser) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      setUser(result.user);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const logout = (setUser) => {
  signOut(auth)
    .then(() => {
      console.log("Successfully logged out!");
      setUser();
    })
    .catch((error) => {
      console.log(error);
    });
};
