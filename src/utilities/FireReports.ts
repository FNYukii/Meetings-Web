import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "./firebase"

export default class FireReports {

    static async createReport(targetId: string, targetCollectionName: string, probremCategory: number, detail: string): Promise<string | null> {

        try {

            const docRef = await addDoc(collection(db, "reports"), {
                createdAt: serverTimestamp(),
                targetId: targetId,
                targetCollectionName: targetCollectionName,
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