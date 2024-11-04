'use client';

import { useEffect, useState } from "react";
import { fetchLambda1 } from "@/app/services/lambdaService";
import { addVideo } from "@/app/services/prismaService";
import { useFirebaseAuth } from "@/app/context/Context";
import { Video } from "@/app/models/lambda1";
import { signInAnonymously } from "firebase/auth";

export default function Suggestions({ url }: { url: string }) {
  const auth = useFirebaseAuth();
  const [video, setVideo] = useState<Video | null>(null);

  useEffect(() => {
    if (!auth) return;
    async function createVideo(userId: string, url: string) {      
      const lambda1Response = await fetchLambda1(url);
      const data = lambda1Response.data;
      const video = await addVideo(userId, data);
      setVideo(video);
    };
    async function signIn() {
      try {
        if (!auth) return;
        const userCredential = await signInAnonymously(auth);
        const userId = userCredential.user.uid;
        createVideo(userId, url);
      } catch (error) {
        console.error("Error signing in:", error);
      }
    }
    signIn();
  }, [auth]);
  if (!auth) return <div>Loading...</div>;
  
  return <div className="flex flex-col w-full justify-start">
    Video: {JSON.stringify(video)}
  </div>;
}