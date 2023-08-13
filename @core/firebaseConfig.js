import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDcyPWfqrDOCCr-7KXhqcxIeazzAdK9CZk",
    authDomain: "fome-zero-69759.firebaseapp.com",
    projectId: "fome-zero-69759",
    storageBucket: "fome-zero-69759.appspot.com",
    messagingSenderId: "794596924760",
    appId: "1:794596924760:web:e21714c42e6ac42f2d192d",
    measurementId: "G-BF4JP7RSFW",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };