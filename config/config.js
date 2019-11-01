import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBs95Fky1Py0-TYD03v1tyOrnVSp058iNE",
    authDomain: "photo-feed-b48a2.firebaseapp.com",
    databaseURL: "https://photo-feed-b48a2.firebaseio.com",
    projectId: "photo-feed-b48a2",
    storageBucket: "photo-feed-b48a2.appspot.com",
    messagingSenderId: "713054923217",
    appId: "1:713054923217:web:368ccf17ef1c1599ee98f0",
    measurementId: "G-8C10L57HQB"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase acessable functionality
export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
