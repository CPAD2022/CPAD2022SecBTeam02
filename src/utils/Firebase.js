import firebase from 'firebase';
import 'firebase/firestore';

const Firebase = firebase.initializeApp({
    apiKey: "AIzaSyDIlb6VB1PEqLSMxdAYAIJx5KOif31yQf4",
    authDomain: "cpad-6d703.firebaseapp.com",
    projectId: "cpad-6d703",
    storageBucket: "cpad-6d703.appspot.com",
    messagingSenderId: "982121325640",
    appId: "1:982121325640:web:936c3803790ddc627c247d",
    measurementId: "G-WEL8RDZ012"
});
export const db = firebase.firestore()
export default Firebase