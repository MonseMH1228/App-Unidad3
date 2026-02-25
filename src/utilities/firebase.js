
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import { getDatabase } from "firebase/database";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js"; 

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAO1jZdgOYpih-QCKAwnFjfqT2cYKb66j8",
    authDomain: "tarea2-p3.firebaseapp.com",
    databaseURL: "https://tarea2-p3-default-rtdb.firebaseio.com",
    projectId: "tarea2-p3",
    storageBucket: "tarea2-p3.firebasestorage.app",
    messagingSenderId: "388536712253",
    appId: "1:388536712253:web:adc5b0680a209b45dbfe54"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const database = getDatabase(app);
