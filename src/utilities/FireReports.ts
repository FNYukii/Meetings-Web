import { addDoc, collection, FieldValue, serverTimestamp } from "firebase/firestore"
import { db } from "./firebase"

export default class FireReports {

    static async createReport(targetId: string, targetCollectionId: string, probremCategory: number, detail: string): Promise<string | null> {

        try {

            const docRef = await addDoc(collection(db, "reports"), {
                createdAt: serverTimestamp(),
                targetId: targetId,
                targetCollectionId: targetCollectionId,
                probremCategory: probremCategory,
                detail: detail
            })
            
            console.log("Add 1 Report.")

            return docRef.id

        } catch (error) {

            return null
        }
    }
}