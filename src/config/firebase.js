import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { googleSignInBE } from "../services/authService";

const firebaseConfig = {
   apiKey: "AIzaSyAJLKKAm4a5ptq2Gx2jM5f9DqmwFACl8k4",
   authDomain: "kahoot-5869a.firebaseapp.com",
   projectId: "kahoot-5869a",
   storageBucket: "kahoot-5869a.appspot.com",
   messagingSenderId: "969819764732",
   appId: "1:969819764732:web:52bb4ef108a5f64acfa479",
   measurementId: "G-NYWJ6X457L"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
   prompt: "select_account"
});

export const signInWithGoogle = async () => {
   try {
      await auth.signInWithPopup(provider);
      const idToken = await auth.currentUser.getIdToken();
      return await googleSignInBE(idToken);
   } catch (e) {
      console.error(e.message);
      return false;
   }
};
