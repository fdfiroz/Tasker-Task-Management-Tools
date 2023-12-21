// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUYhzAdO4IiEeMCON44OkgXoKcUcjDJns",
  authDomain: "tasker-task-management-tools.firebaseapp.com",
  projectId: "tasker-task-management-tools",
  storageBucket: "tasker-task-management-tools.appspot.com",
  messagingSenderId: "545027725299",
  appId: "1:545027725299:web:f1c9533ff44bf8718e6486"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;