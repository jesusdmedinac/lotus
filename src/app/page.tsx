"use client";

import { Box, Button, Modal } from "@mui/material";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import AccordionSuggestions from "./components/accordion.suggestions";
import YouTubeComponent from "./components/youtube";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import "./local.css";
import { initializeApp } from "firebase/app";
import { Analytics, getAnalytics, logEvent } from "firebase/analytics";
import { fetchGeneratedContent } from "./services/geminiService";
import { fetchVideoTranscript } from "./services/videoService";

const style = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  bgcolor: 'var(--background)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const [open, setOpen] = useState(false);
  const intervalRef = useRef(0);
  const [counter, setCounter] = useState(0);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [suggestedContentList, setSuggestedContentList] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  useEffect(() => {
    console.log(counter);
    
    async function loadVideoTranscript() {
      const currentTranscript = fetchVideoTranscript(counter);
      if (currentTranscript) {
        setCurrentTranscript(currentTranscript);
      }
    }
    loadVideoTranscript();
  }, [counter]);
  
  useEffect(() => {
    if (!currentTranscript) return;
    async function loadGeneratedContent() {
      try {
        const responseData = await fetchGeneratedContent(currentTranscript);
        setSuggestedContentList((prevList) => [
          ...prevList, 
          responseData.candidates[0].content.parts[0].text
        ]);
      } catch (error) {
        console.error("Error fetching generated content:", error);
      }
    }
    loadGeneratedContent();
  }, [currentTranscript]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const youtubeURLId = "SL6qw9-9NEQ";
  const youtubeThumbnail = `http://i3.ytimg.com/vi/${youtubeURLId}/hqdefault.jpg`
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePlay = (event: any) => {
    console.log("dani onPlay", event.target);
    intervalRef.current = window.setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 1000);
  };
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePause = (event: any) => {
    console.log("event pause", event);
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    async function loadfirebaseApp() {
      const firebaseConfig = {
        apiKey: "AIzaSyBs9_py4Jiv49Z_apF_EmZamcWH6jVVPIM",
        authDomain: "lotus-3cda7.firebaseapp.com",
        projectId: "lotus-3cda7",
        storageBucket: "lotus-3cda7.firebasestorage.app",
        messagingSenderId: "175750848964",
        appId: "1:175750848964:web:ac8674d1cef6839ae8c491",
        measurementId: "G-KFSF0HPR5N"
      };
      
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);      
      setAnalytics(analytics);
      logEvent(analytics, "analytics_loaded");
      console.log("analytics loaded"); 
    }
    loadfirebaseApp();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="absolute left-0 top-0 w-full h-full">
        <YouTubeComponent
          id={youtubeURLId}
          handlePlay={handlePlay}
          handlePause={handlePause}
           />
      </div>
      <Button onClick={handleOpen} className="ai-button-background z-50 right-12 top-12 absolute rounded-full px-4 py-2 text-lg text-white">
        <div className="flex items-center justify-center">
          <Image
            src="/lotus.svg"
            alt="Logo Lotus"
            width={32}
            height={32}
            />
          <p className="ml-2">
            Descubre más en Lotus
          </p>
        </div>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button onClick={handleClose} className="ai-button-background z-50 left-12 top-12 absolute rounded-full px-4 py-2 text-lg text-white">
            <div className="flex items-center justify-center">
              <ArrowBackIosNewIcon />
              <Image
                src={youtubeThumbnail}
                alt="Logo Lotus"
                width={32}
                height={32}
                />
              <p className="ml-2">
                Seguir viendo el video
              </p>
            </div>
          </Button>
          <AccordionSuggestions 
            currentTranscript={currentTranscript}
            suggestedContentList={suggestedContentList}
          />
        </Box>
      </Modal>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
