import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

export const sendMessage = async (message: string = ''): Promise<void> => {
    try {
        const docRef = await addDoc(collection(db, "incoming_messages"), {
            message: message,    
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
