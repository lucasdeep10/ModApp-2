import firebase from 'firebase'
import 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyDOHuZOWU4ptSGza86jLWj9ENIUTsA3Pig",
  authDomain: "modapp-bb715.firebaseapp.com",
  projectId: "modapp-bb715",
  storageBucket: "modapp-bb715.appspot.com",
  messagingSenderId: "109456236379",
  appId: "1:109456236379:web:2f4065aa6bc71131ff847e",
  measurementId: "G-ZFME292LCE"
};

//* -- Inicializar FireBase -- 
export const app = firebase.initializeApp(firebaseConfig);

//* -- Funciones --
export function getFirestore(){    
    return firebase.firestore(app)
}
