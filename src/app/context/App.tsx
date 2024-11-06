'use client';

import { useEffect, useState } from "react";
import { FirebaseAnalyticsContext, FirebaseAppContext, FirebaseAuthContext } from "./Context";
import { FirebaseApp } from "firebase/app";
import { Analytics } from "firebase/analytics";
import { Auth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { green, pink } from "@mui/material/colors";
import LoadingComponent from "@/app/components/LoadingComponent";
import VotaComponent from "../components/VotaComponent";
import FeedbackComponent from "../components/FeedbackComponent";

export default function App({ children }: { children: React.ReactNode }) {
  const [app, setApp] = useState<FirebaseApp | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyBs9_py4Jiv49Z_apF_EmZamcWH6jVVPIM",
      authDomain: "lotus-3cda7.firebaseapp.com",
      projectId: "lotus-3cda7",
      storageBucket: "lotus-3cda7.firebasestorage.app",
      messagingSenderId: "175750848964",
      appId: "1:175750848964:web:ac8674d1cef6839ae8c491",
      measurementId: "G-KFSF0HPR5N"
    };
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth(app);
    setApp(app);
    setAnalytics(analytics);
    setAuth(auth);
  }, []);

  if (!app || !analytics || !auth) return <LoadingComponent message="" />;
  return (
    <FirebaseAppContext.Provider value={app}>
      <FirebaseAnalyticsContext.Provider value={analytics}>
        <FirebaseAuthContext.Provider value={auth}>
          <ThemeProvider theme={createTheme({
            cssVariables: true,
            palette: {
              primary: green,
              secondary: pink,
              mode: "dark"
            }
          })}>
            <CssBaseline />
            <VotaComponent className="fixed top-2 start-2" />
            <FeedbackComponent className="fixed bottom-2 start-2" />
            {children}
          </ThemeProvider>
        </FirebaseAuthContext.Provider>
      </FirebaseAnalyticsContext.Provider>
    </FirebaseAppContext.Provider>
  )
}