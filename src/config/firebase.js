import firebase from "firebase/compat/app";
import "firebase/compat/auth";

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

export const signInWithGoogle = async () => {
   const googleSignIn = await auth.signInWithPopup(provider);
   console.log(googleSignIn);
   console.log(googleSignIn.credential.idToken);
   /*    const data = await auth.currentUser.getIdToken(/!* forceRefresh *!/ true);
    console.log('data:', data);*/
};
