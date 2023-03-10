import { getFirestore, collection, onSnapshot, query, where, Query } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
// import { initializeApp } from 'firebase/app';
// initializeApp({
//   apiKey: "AIzaSyD5-Pbt6f0UAnhMc3f-O9d6G_v-X3h6cWQ",
//   authDomain: "megustafirebase.firebaseapp.com",
//   projectId: "megustafirebase",
//   storageBucket: "megustafirebase.appspot.com",
//   messagingSenderId: "1089924547092",
//   appId: "1:1089924547092:web:30a054c6125364b132dd01",
//   measurementId: "G-0ZC9NCYCP8"
// });

const auth = getAuth();
const db = getFirestore();
const ul = document.querySelector('ul');
const button = document.querySelector('button');

onAuthStateChanged(auth, user => {
  if(user == null) { return; }
  const { uid } = user;
  const expensesCol = collection(db, `users/${uid}/expenses`);
  const expensesQuery = query(
    expensesCol,
    where('cost', '>', 10.00)
  )
  createStream(expensesQuery);
})

function createStream(ref: Query) {
  return onSnapshot(ref, snapshot => {
    const expenses = snapshot.docs.map(d => d.data());
    
    // sync with UI
    expenses.forEach(expense => {
      const li = document.createElement('li');
      li.textContent = `${expense.name} - ${expense.cost}`;
      ul?.appendChild(li);
    })

  });
}

button?.addEventListener('click', clickEvent => {
  signInWithRedirect(auth, new GoogleAuthProvider());
});
