import { readonly, ref } from "vue";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
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

// const user = ref<User | undefined>(undefined);
const isLoginRef = ref<boolean>(false);
const userIdTokenRef = ref<string | undefined>(undefined);
const userTeamIdRef = ref<string | undefined>(undefined);

onAuthStateChanged(auth, async (_user) => {
  if (_user) {
    isLoginRef.value = true;
    userIdTokenRef.value = await _user.getIdToken();
    userTeamIdRef.value = (await _user.getIdTokenResult()).claims
      .teamId as string;
  } else {
    isLoginRef.value = false;
    userIdTokenRef.value = undefined;
    userTeamIdRef.value = undefined;
  }
});

function waitForAuthStateChangeOnce() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        unsubscribe(); // 一度だけ
        resolve(user);
      }
    });
  });
}

export const isLogin = readonly(isLoginRef);

export const userTeamId = readonly(userTeamIdRef);

export const userIdToken = readonly(userIdTokenRef);

export async function signUp(email: string, password: string) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await waitForAuthStateChangeOnce();
  } catch (error) {
    throw error;
  }
}

export async function signIn(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    await waitForAuthStateChangeOnce();
  } catch (error) {
    throw error;
  }
}

export function logout() {
  signOut(auth);
}
