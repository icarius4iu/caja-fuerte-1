import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    query,
    orderBy,
    where,
    Timestamp
} from "firebase/firestore";
import app from "../firebase";

const db = getFirestore(app);
const COLLECTION_NAME = "calendar_events";

export interface CalendarEvent {
    id?: string;
    title: string;
    category: 'apuesta_gratis' | 'giros_gratis' | 'supercuotas';
    startDate: string; // ISO string YYYY-MM-DD
    endDate: string; // ISO string YYYY-MM-DD
    benefit: string;
    imageUrl?: string;
    createdAt?: string;
}

/**
 * Creates a new calendar event in Firestore.
 */
export async function createCalendarEvent(event: Omit<CalendarEvent, 'id' | 'createdAt'>): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...event,
            createdAt: new Date().toISOString()
        });
        return docRef.id;
    } catch (error) {
        console.error("Error creating calendar event:", error);
        throw error;
    }
}

/**
 * Retrieves all calendar events.
 * Optionally can be filtered by date range in the future.
 */
export async function getCalendarEvents(): Promise<CalendarEvent[]> {
    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy("startDate", "asc"));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as CalendarEvent));
    } catch (error) {
        console.error("Error fetching calendar events:", error);
        throw error;
    }
}

/**
 * Deletes a calendar event by ID.
 */
export async function deleteCalendarEvent(id: string): Promise<void> {
    try {
        await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
        console.error("Error deleting calendar event:", error);
        throw error;
    }
}
