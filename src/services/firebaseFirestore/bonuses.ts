import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    query,
    orderBy,
    where
} from "firebase/firestore";
import app from "../firebase";

const db = getFirestore(app);
const COLLECTION_NAME = "bonuses";

export interface Bonus {
    id?: string;
    slug: string;
    title: string;
    type: 'welcome' | 'free_bet' | 'rollover' | 'combined' | 'cashback';
    logo?: string; // URL
    bgColor?: string; // Tailwind class
    investment: string; // e.g. "S/. 200"
    profit: string; // e.g. "S/. 20"
    description: string;
    videoUrl?: string;
    verification?: string; // e.g. "DNI + SELFIE"
    paymentMethods?: string;

    // Sorting & Logic
    profitAmount: number;
    investmentAmount: number;
    popularity?: number;
    country: 'PE' | 'Global';

    // Legacy/Admin Form specifics (keeping for compatibility or new features)
    code?: string;
    expiryDate?: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}

/**
 * Creates a new bonus in Firestore.
 */
export async function createBonus(bonus: Omit<Bonus, 'id' | 'createAt'>): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...bonus,
            createdAt: new Date().toISOString(),
            isActive: true
        });
        return docRef.id;
    } catch (error) {
        console.error("Error creating bonus:", error);
        throw error;
    }
}

/**
 * Retrieves all active bonuses.
 */
export async function getBonuses(activeOnly = true): Promise<Bonus[]> {
    try {
        // Using simple query without compound index requirement
        const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        let results = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Bonus));

        // Filter in-memory to avoid Firestore composite index requirement
        if (activeOnly) {
            results = results.filter(b => b.isActive === true);
        }

        return results;
    } catch (error) {
        console.error("Error fetching bonuses:", error);
        throw error;
    }
}

/**
 * Deletes (or logically deletes) a bonus.
 * For now we'll do hard delete, but in real apps soft delete is better.
 */
export async function deleteBonus(id: string): Promise<void> {
    try {
        await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
        console.error("Error deleting bonus:", error);
        throw error;
    }
}
