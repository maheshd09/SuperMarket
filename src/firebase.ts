const firebaseConfig = {
  apiKey: "AIzaSyCiumx7AY6csHRoONEFAoncAw-Anyj8i5A",
  authDomain: "shopping-proj-afc64.firebaseapp.com",
  projectId: "shopping-proj-afc64",
  storageBucket: "shopping-proj-afc64.firebasestorage.app",
  messagingSenderId: "954251465344",
  appId: "1:954251465344:web:a16d410687ec4d91960c65",
  measurementId: "G-1W4S5DP6ZB"
};

export async function ensureFirestore() {
  if (!firebaseConfig.projectId) {
    throw new Error('Missing Firebase config. Add VITE_FIREBASE_* variables to .env')
  }

  const appModule = await import('firebase/app')
  const firestoreModule = await import('firebase/firestore')

  if (!appModule.getApps().length) {
    appModule.initializeApp(firebaseConfig)
  }

  return firestoreModule.getFirestore()
}

