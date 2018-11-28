import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const prodConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: '',
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
};

const devConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY_DEV,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN_DEV,
  databaseURL: process.env.VUE_APP_DATABASE_URL_DEV,
  projectId: process.env.VUE_APP_PROJECT_ID_DEV,
  storageBucket: '',
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_DEV,
};

const firebaseUIConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.database();

export { auth, db, firebaseUIConfig };
