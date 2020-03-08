import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

const config = {
  apiKey: "AIzaSyAMQ8EgHzUs4Y7EGTcVBMolYP5aWSEgvHU",
  authDomain: "healthtracker-4cece.firebaseapp.com",
  databaseURL: "https://healthtracker-4cece.firebaseio.com",
  projectId: "healthtracker-4cece",
  storageBucket: "healthtracker-4cece.appspot.com",
  messagingSenderId: "754337768357",
  appId: "1:754337768357:web:b85cafbdad924bd75ffe4c",
  measurementId: "G-5J6TXB348S"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();

export const functions = firebase.functions();
