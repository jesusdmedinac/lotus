import { createContext, useContext } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Analytics } from 'firebase/analytics';
import { Auth } from 'firebase/auth';

export const FirebaseAppContext = createContext<FirebaseApp | null>(null);
export const useFirebaseApp = () => useContext(FirebaseAppContext);

export const FirebaseAnalyticsContext = createContext<Analytics | null>(null);
export const useFirebaseAnalytics = () => useContext(FirebaseAnalyticsContext);

export const FirebaseAuthContext = createContext<Auth | null>(null);
export const useFirebaseAuth = () => useContext(FirebaseAuthContext);