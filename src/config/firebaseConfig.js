import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAdaEOBpCCHQvy8a3apaVLpvUm75kaCkXs",
  authDomain: "financialmanager-dd116.firebaseapp.com",
  projectId: "financialmanager-dd116",
  storageBucket: "financialmanager-dd116.appspot.com",
  messagingSenderId: "349009453152",
  appId: "1:349009453152:web:3996a83c82ad5fce09e305"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app};
