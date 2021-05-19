import * as firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyCRof9eABaLlNKr9r4-Tffl-ZfdKXvK-nA',
  authDomain: 'pinnedrn-1578548706126.firebaseapp.com',
  projectId: 'pinnedrn-1578548706126'
});

export const db = firebase.firestore();

