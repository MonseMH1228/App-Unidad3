// //importacion de las dependencias de inicio de sesion de Google
// import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth';
// import { useAuthState } from "react-firebase-hooks/auth";

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// // import { getDatabase } from "firebase/database";
// import { getDatabase } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js"; 

//   // Your web app's Firebase configuration
//   const firebaseConfig = {
//     apiKey: "AIzaSyAO1jZdgOYpih-QCKAwnFjfqT2cYKb66j8",
//     authDomain: "tarea2-p3.firebaseapp.com",
//     databaseURL: "https://tarea2-p3-default-rtdb.firebaseio.com",
//     projectId: "tarea2-p3",
//     storageBucket: "tarea2-p3.firebasestorage.app",
//     messagingSenderId: "388536712253",
//     appId: "1:388536712253:web:adc5b0680a209b45dbfe54"
//   };

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   export const database = getDatabase(app);


//   //Inicio de sesion de Google
//   export const signInWithGoogle = () => {
//   signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
// };

//   //Cirerre de sesion 
//   const firebaseSignOut = () => signOut(getAuth(firebase));

//   export { firebaseSignOut as signOut };

//   export const useUserState = () => useAuthState(firebase.auth());



// Importaciones SOLO desde NPM
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";


// Configuración
const firebaseConfig = {
  apiKey: "AIzaSyAO1jZdgOYpih-QCKAwnFjfqT2cYKb66j8",
  authDomain: "tarea2-p3.firebaseapp.com",
  databaseURL: "https://tarea2-p3-default-rtdb.firebaseio.com",
  projectId: "tarea2-p3",
  storageBucket: "tarea2-p3.firebasestorage.app",
  messagingSenderId: "388536712253",
  appId: "1:388536712253:web:adc5b0680a209b45dbfe54"
};


// Inicializar Firebase UNA sola vez
const app = initializeApp(firebaseConfig);

// Servicios
export const auth = getAuth(app);
export const database = getDatabase(app);
export const provider = new GoogleAuthProvider();


// 🔵 Login con Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Usuario:", result.user);
  } catch (error) {
    console.error("Error:", error);
  }
};


// 🔴 Logout
export const SignOut = () => signOut(auth);


// 👤 Hook para usuario
export const useUserState = () => useAuthState(auth);