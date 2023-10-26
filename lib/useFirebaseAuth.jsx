import { useState, useEffect } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useRouter } from "next/router";

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const authStateChanged = async (authState) => {
    if (!authState) {
      setLoading(false);
      setAuthUser(null);
      return;
    }

    setLoading(true);

    var formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);

    setLoading(false);
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const logIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const GoogleLogin = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Success. The user is created in firebase:", result);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const signUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError(null);
      router.push("/login");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const logOut = async () => {
    setAuthUser(null);
    try {
      await signOut(auth).then(clear);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    error,
    logIn,
    signUp,
    logOut,
    GoogleLogin,
  };
}
