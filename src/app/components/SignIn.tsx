'use client';

import { useEffect } from "react";
import { signInAnonymously } from "firebase/auth";
import { useFirebaseAuth } from "@/app/context/Context";

export default function SignIn() {
  const auth = useFirebaseAuth();
  useEffect(() => {
    async function signIn() {
      try {
        if (!auth) return;
        await signInAnonymously(auth);
        console.log("User logged in");
      } catch (error) {
        console.error("Error signing in:", error);
      }
    }
    signIn();
  }, [auth]);

  return <></>;
}