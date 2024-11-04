'use client';

import { useEffect } from "react";
import { signInAnonymously } from "firebase/auth";
import { createNewUser } from "@/app/services/prismaService";
import { useFirebaseAuth } from "../context/Context";

export default function CreateUser() {
  const auth = useFirebaseAuth();
  useEffect(() => {
    async function createAnonymousUser() {
      try {
        if (!auth) return;
        const userCredential = await signInAnonymously(auth);
        const userId = userCredential.user.uid;
        const user = await createNewUser(userId);
        console.log("Anonymous user created:", user);
      } catch (error) {
        console.error("Error creating anonymous user:", error);
      }
    }
    createAnonymousUser();
  }, [auth]);

  return <></>;
}