import { QueryDocumentSnapshot } from "firebase/firestore";
import Comment from "../types/Comment";

export default class FireComment {
    
    static toComment(document: QueryDocumentSnapshot): Comment {
        const id: string = document.id
        const userId: string = document.data().userId
        const createdAt: Date = document.data({ serverTimestamps: "estimate" }).createdAt.toDate()

        const threadId: string = document.data().threadId
        const text: string = document.data().text
        const imageUrls: string[] = document.data().imageUrls

        const comment: Comment = {id: id, userId: userId, createdAt: createdAt, threadId: threadId, text: text, imageUrls: imageUrls}
        return comment
    }
}