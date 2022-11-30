import firebase from 'firebase';
import 'firebase/firestore';

const Firebase = firebase.initializeApp({
    apiKey: "AIzaSyCDIPk8elv1mK5TkzkcDQ1gXdFSa461I3Y",
    authDomain: "mobileapp-69297.firebaseapp.com",
    databaseURL: "https://mobileapp-69297.firebaseio.com",
    projectId: "mobileapp-69297",
    storageBucket: "mobileapp-69297.appspot.com",
    messagingSenderId: "778134077175",
    appId: "1:778134077175:web:8abc967dd13fcd6deb9df2",
    measurementId: "G-Z6F4ZDTG8B"
});

export const db = firebase.firestore()
export default Firebase