import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD5yuJYB0WBUuz2zaUML3xnojJfarxjlUU",
    authDomain: "rn-task-manager.firebaseapp.com",
    projectId: "rn-task-manager",
    storageBucket: "rn-task-manager.appspot.com",
    messagingSenderId: "442681966386",
    appId: "1:442681966386:web:77d3839872a1c5ad2b212b"
};

const app = firebase.initializeApp(firebaseConfig);

export const db = app.firestore();