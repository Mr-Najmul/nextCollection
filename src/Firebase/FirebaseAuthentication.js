import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";

// Initialize firebase
export const initializeAppfirebase = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
};
initializeAppfirebase();

// Sign in with google
export const googleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((userCredential) => {
      const newUserInfo = userCredential.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

// Sign up with email and password
export const signupWithEmailAndPassword = (email, password, name) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      updateUserDisplayName(name);
      const newUserInfo = userCredential.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

// Updete name of current user
export const updateUserDisplayName = (name) => {
  const user = firebase.auth().currentUser;
  user
    .updateProfile({
      displayName: name,
    })
    .then(function () {
      console.log("Name updated successfully");
    })
    .catch(function (error) {
      console.log("Ops...");
    });
};

// Sign with email and password
export const signInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      //return userCredential.user;

      const newUserInfo = userCredential.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

// Signout
export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Sign out successfully");
    })
    .catch((error) => {
      console.log("Ops....");
    });
};

// Sign in with facebook
export const facebookSignIn = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((userCredential) => {
      const newUserInfo = userCredential.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

export const checkLoginUser = () => {
  firebase.auth().onAuthStateChanged((userAuth) => {
    console.log(userAuth);
    return userAuth;
  });
};

export const fireAuth = firebase.auth();
