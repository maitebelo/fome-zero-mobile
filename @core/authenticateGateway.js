import { firebase } from './firebaseConfig';

const firebaseAuth = firebase.auth();

async function login(email, password) {
  try {
    return await firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        return data?.user;
      })
      .catch((error) => {
        console.error(error);
        throw new Error('Method not implemented.');
      });
  } catch (error) {
    console.error(error);
    throw new Error('Method not implemented.');
  }
}

async function register(email, password) {
  try {
    return await firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        return data?.user;
      })
      .catch((error) => {
        console.error(error);
        throw new Error('Method not implemented.');
      });
  } catch (error) {
    console.error(error);
    throw new Error('Method not implemented.');
  }
}

async function currentUser() {
  try {
    return firebaseAuth?.currentUser?.uid;
  } catch (error) {
    console.error(error);
    throw new Error('Method not implemented.');
  }
}

async function sendPasswordResetEmail(email) {
  try {
    return await firebaseAuth
      .sendPasswordResetEmail(email)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(error);
        throw new Error('Method not implemented.');
      });
  } catch (error) {
    console.error(error);
    throw new Error('Method not implemented.');
  }
}

export { login, register, currentUser, sendPasswordResetEmail };
