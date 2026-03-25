// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { firebase } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBBXj-COJBHV0B10JyfljYcbszlom_atO8',
  authDomain: 'finalevaluation-9f4c1.firebaseapp.com',
  projectId: 'finalevaluation-9f4c1',
  storageBucket: 'finalevaluation-9f4c1.firebasestorage.app',
  messagingSenderId: '1064127758007',
  appId: '1:1064127758007:web:5fa33a0a9218db6ce79732',
  measurementId: 'G-DJLZD6Z14N',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export { auth };
