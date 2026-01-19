import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import app from "../firebase";

const db = getFirestore(app);

export type UserRole = "admin" | "user" | null;

/**
 * Retrieves the role of a user from Firestore.
 * @param uid The user's UID.
 * @returns The user's role if found, otherwise null.
 */
export async function getUserRole(uid: string): Promise<UserRole> {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const data = userDoc.data();
      return (data.role as UserRole) || null;
    } else {
      console.warn(`User document for UID ${uid} not found.`);
      return null;
    }
  } catch (error) {
    return null;
  }
}

/**
 * Creates a user profile in Firestore.
 * @param uid The user's UID.
 * @param email The user's email.
 * @param role The role to assign (default: 'user').
 */
export async function createUserProfile(uid: string, email: string, role: UserRole = 'user'): Promise<void> {
  try {
    const userDocRef = doc(db, "users", uid);
    await setDoc(userDocRef, {
      email,
      role,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
}
