'use client';

import { useEffect } from "react";
import { signInAnonymously } from "firebase/auth";
import { createNewUser } from "@/app/services/prismaService";
import { useFirebaseAuth } from "@/app/context/Context";

export default function SignIn() {
  const auth = useFirebaseAuth();
  useEffect(() => {
    async function signIn() {
      try {
        if (!auth) return;
        const userCredential = await signInAnonymously(auth);
        const userId = userCredential.user.uid;
        const user = await createNewUser(userId);
        console.log("User logged in:", user);
      } catch (error) {
        console.error("Error signing in:", error);
      }
    }
    signIn();
  }, [auth]);

  return <></>;
}