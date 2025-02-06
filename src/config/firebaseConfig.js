import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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
const storage = getStorage(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    
  })
  .catch((error) => {
    console.error('Erro ao configurar a persistência de autenticação:', error);
  });

export { auth, db, storage, app };
  