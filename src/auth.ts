import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let user: User | undefined = undefined;

export async function signUp(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    user = userCredential.user;
  } catch (error) {
    console.log("signuperror");
    throw error;
  }
}

export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    user = userCredential.user;
  } catch (error) {
    console.log("signinerror");
    throw error;
  }
}

export function signOut() {
  user = undefined;
}

export function getLoginUser() {
  return user;
}

export async function getLoginUserTeamId() {
  if (user) {
    const tokenResult = await user.getIdTokenResult();
    return tokenResult.claims.teamId;
  }
  return undefined;
}
