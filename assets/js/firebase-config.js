// Firebase project: stagg-hill-member-login
// These values are public client identifiers (not secrets) — safe to ship in
// browser-side code. See https://firebase.google.com/docs/projects/api-keys
import {initializeApp} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js'
import {getAuth} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js'

const firebaseConfig = {
  apiKey: 'AIzaSyC7o2c0SuSVi7nnvkPdXMUJOiiJHk8GL-E',
  authDomain: 'stagg-hill-member-login.firebaseapp.com',
  projectId: 'stagg-hill-member-login',
  storageBucket: 'stagg-hill-member-login.firebasestorage.app',
  messagingSenderId: '537168464824',
  appId: '1:537168464824:web:614fbfcaecec34eb845d4d',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
