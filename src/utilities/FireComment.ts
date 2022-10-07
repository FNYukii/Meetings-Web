import { collection, getDocsFromCache, getDocsFromServer, limit, orderBy, query, QueryDocumentSnapshot, where } from "firebase/firestore";
import Comment from "../types/Comment";
import { db } from "./firebase";

export default class FireComment {

    static toComment(document: QueryDocumentSnapshot): Comment {
        const id: string = document.id
        const userId: string = document.data().userId
        const createdAt: Date = document.data({ serverTimestamps: "estimate" }).createdAt.toDate()

        const threadId: string = document.data().threadId
        const text: string = document.data().text
        const imageUrls: string[] = document.data().imageUrls

        const comment: Comment = { id: id, userId: userId, createdAt: createdAt, threadId: threadId, text: text, imageUrls: imageUrls }
        return comment
    }

    static async readFirstCommentFromCache(threadId: string): Promise<Comment | null> {
        // クエリを作成
        const q = query(
            collection(db, "comments"),
            where("threadId", "==", threadId),
            orderBy("createdAt"),
            limit(1)
        )
        
        try {
            // キャッシュから読み取り
            const querySnapshot = await getDocsFromCache(q)

            // 配列comments
            let comments: Comment[] = []
            querySnapshot.forEach((doc) => {
                const comment = this.toComment(doc)
                comments.push(comment)
            })

            // 0件なら失敗
            if (comments.length === 0) {
                return null
            }

            // 成功
            return comments[0]

        } catch(e) {
            // サーバーから読み取り
            const querySnapshot = await getDocsFromServer(q)

            // 配列comments
            let comments: Comment[] = []
            querySnapshot.forEach((doc) => {
                const comment = this.toComment(doc)
                comments.push(comment)
            })

            // 0件なら失敗
            if (comments.length === 0) {
                return null
            }

            // 成功
            return comments[0]
        }
    }
}