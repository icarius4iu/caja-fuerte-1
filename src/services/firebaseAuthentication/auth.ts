import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signOut, 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup, 
  updatePassword, 
  type User,
  type UserCredential
} from "firebase/auth";
import app from "../firebase";

// Initialize Authentication
export const auth = getAuth(app);

// Authentication Functions

export const signup = (email: string, password: string): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const login = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const passwordReset = (email: string): Promise<void> => {
    return sendPasswordResetEmail(auth, email);
};

export const logout = (): Promise<void> => {
    return signOut(auth);
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
};

export const loginWithGoogle = (): Promise<UserCredential> => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
};

export const updateUserPassword = (newPassword: string): Promise<void> => {
    if (!auth.currentUser) return Promise.reject("No user is signed in.");
    return updatePassword(auth.currentUser, newPassword);
};
