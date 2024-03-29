import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDgOthmD0KntKSTo7mGFwIoWCou1f7GFkc',
  authDomain: 'legacies-853d4.firebaseapp.com',
  projectId: 'legacies-853d4',
  storageBucket: 'legacies-853d4.appspot.com',
  messagingSenderId: '819442191324',
  appId: '1:819442191324:web:3f22e30b81f7afad939d19',
  measurementId: 'G-2YT00B4VT7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};

export default app;