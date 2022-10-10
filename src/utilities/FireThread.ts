import Thread from '../types/Thread'

import { QueryDocumentSnapshot, DocumentData, doc, getDocFromCache, getDocFromServer, query, collection, orderBy, limit, getDocs, where, startAt, endAt } from "firebase/firestore"
import { db } from './firebase'
import ExArray from './ExArray'

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

    static async readRecentTags(): Promise<string[] | null> {

        const q = query(collection(db, "threads"), orderBy("createdAt", "desc"), limit(50))

        try {

            // サーバー / キャッシュから読み取り
            const querySnapshot = await getDocs(q)

            // 読み取り成功
            console.log(`Read ${querySnapshot.size} Threads from cache / server.`)

            // 配列threads
            let threads: Thread[] = []
            querySnapshot.forEach((doc) => {
                const thread = this.toThread(doc)
                threads.push(thread)
            })

            // 配列recentTags
            let recentTags: string[] = []
            threads.forEach(thread => {
                const tags = thread.tags
                recentTags = recentTags.concat(tags)
            })

            // 配列recentTagsから重複を排除
            recentTags = recentTags.filter((item, index, self) => self.indexOf(item) === index)

            // 配列になぜか空文字が含まれている現象を確認したので、filterメソッドで削除
            recentTags = recentTags.filter((item) => item !== "")

            // 配列の要素数を制限
            recentTags = ExArray.toLimited(recentTags, 7)

            return recentTags

        } catch (error) {
            
            // 読み取り失敗
            return null
        }
    }

    static async readThreadsByTag(tag: string): Promise<Thread[] | null> {

        const q = query(collection(db, "threads"), where("tags", "array-contains", tag), limit(9999))

        try {

            // サーバー / キャッシュから読み取り
            const querySnapshot = await getDocs(q)

            // 成功
            console.log(`Read ${querySnapshot.size} Threads from cache / server.`)

            // 配列threads
            let threads: Thread[] = []
            querySnapshot.forEach((doc) => {
                const thread = this.toThread(doc)
                threads.push(thread)
            })

            return threads

        } catch (error) {

            // 失敗
            return null
        }
    }

    static async readThreadsByTitle(keyword: string): Promise<Thread[] | null> {

        const q = query(collection(db, "threads"), orderBy("title"), startAt(keyword), endAt(keyword + '\uf8ff'), limit(50))

        try {

            // サーバー / キャッシュから読み取り
            const querySnapshot = await getDocs(q)

            // 成功
            console.log(`Read ${querySnapshot.size} Threads from cache / server.`)

            // 配列threads
            let threads: Thread[] = []
            querySnapshot.forEach((doc) => {
                const thread = FireThread.toThread(doc)
                threads.push(thread)
            })

            return threads

        } catch (error) {

            // 失敗
            return null
        }
    }

    static async readThreadsByKeyword(keyword: string): Promise<Thread[] | null> {

        // タイトルで検索
        const threadsByTitle = await this.readThreadsByTitle(keyword)
        if (threadsByTitle === null) {
            return null
        }

        // タグで検索
        const threadsByTag = await this.readThreadsByTag(keyword)
        if (threadsByTag === null) {
            return null
        }

        let threads = threadsByTitle.concat(threadsByTag)

        return threads
    }
}