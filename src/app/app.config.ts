import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "angularfirebase-93f57", appId: "1:1014623003181:web:7ea78ab7b557445b6f0ea4", storageBucket: "angularfirebase-93f57.firebasestorage.app", apiKey: "AIzaSyByPPBs61NDKXbzwi7kj-1tHmQ2kGWpUjo", authDomain: "angularfirebase-93f57.firebaseapp.com", messagingSenderId: "1014623003181" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())]
};
