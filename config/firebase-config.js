import * as firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyB-xcDelvbgAllay6QyFZLc4okGVStkzWs',
  authDomain: 'pinned21-85f63.firebaseapp.com',
  projectId: 'pinned21-85f63'
});

export const db = firebase.firestore();

