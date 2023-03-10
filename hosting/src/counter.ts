export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}
import { initializeApp } from 'firebase/app';
initializeApp({
  apiKey: "AIzaSyD5-Pbt6f0UAnhMc3f-O9d6G_v-X3h6cWQ",
  authDomain: "megustafirebase.firebaseapp.com",
  projectId: "megustafirebase",
  storageBucket: "megustafirebase.appspot.com",
  messagingSenderId: "1089924547092",
  appId: "1:1089924547092:web:30a054c6125364b132dd01",
  measurementId: "G-0ZC9NCYCP8"
});

import { getAuth, onAuthStateChanged, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
const auth = getAuth();
const button = document.querySelector('button');

onAuthStateChanged(auth, user => {
  if(user == null) { return; }
  console.log(user);
})

button?.addEventListener('click', clickEvent => {
  signInWithRedirect(auth, new GoogleAuthProvider());
});
