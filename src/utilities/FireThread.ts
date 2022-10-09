import Thread from '../types/Thread'

import { QueryDocumentSnapshot, DocumentData, doc, getDocFromCache, getDocFromServer } from "firebase/firestore"
import { db } from './firebase'

export default class FireThread {

    static toThread(document: QueryDocumentSnapshot<DocumentData>): Thread {
        const id: string = document.id ?? ""
        const userId: string = document.data().userId ?? ""
        const createdAt: Date = document.data({ serverTimestamps: "estimate" }).createdAt.toDate() ?? new Date()
        const commentedAt: Date = document.data({ serverTimestamps: "estimate" }).commentedAt.toDate() ?? new Date()

        const title: string = document.data().title ?? ""
        const tags: string[] = document.data().tags ?? ""

        const thread: Thread = { id: id, userId: userId, createdAt: createdAt, commentedAt: commentedAt, title: title, tags: tags }
        return thread
    }

    static async readThreadFromCache(threadId: string): Promise<Thread | null> {
        
        const docRef = doc(db, "threads", threadId)

        try {
            // キャッシュから読み取り
            const docSnapFromCache = await getDocFromCache(docRef)

            // 失敗
            if (!docSnapFromCache.exists()) {
                return null
            }

            //成功
            console.log(`Read 1 Thread from cache.`)
            return this.toThread(docSnapFromCache)

        } catch (e) {
            // サーバーから読み取り
            const docSnapFromServer = await getDocFromServer(docRef)

            // 失敗
            if (!docSnapFromServer.exists()) {
                return null
            }

            // 成功
            console.log(`Read 1 Thread from server.`)
            return this.toThread(docSnapFromServer)
        }
    }
}