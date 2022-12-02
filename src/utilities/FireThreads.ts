import Thread from '../entities/Thread'

import { QueryDocumentSnapshot, DocumentData, doc, getDocFromCache, getDocFromServer, query, collection, orderBy, limit, getDocs, where, startAt, endAt, deleteDoc, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from './firebase'
import ExArray from './ExArray'
import FireAuth from './FireAuth'
import FireUsers from './FireUsers'

export default class FireThreads {

    static toThread(document: QueryDocumentSnapshot<DocumentData>): Thread {
        const id: string = document.id ?? ""
        const userId: string = document.data().userId ?? ""
        const createdAt: Date = document.data({ serverTimestamps: "estimate" }).createdAt.toDate()
        const commentedAt: Date | null = document.data({ serverTimestamps: "estimate" }).commentedAt?.toDate()

        const title: string = document.data().title ?? ""
        const tags: string[] = document.data().tags ?? ""

        const thread: Thread = { id: id, userId: userId, createdAt: createdAt, commentedAt: commentedAt, title: title, tags: tags }
        return thread
    }

    static async toUnmutedThreads(from: Thread[]): Promise<Thread[] | null> {

        const threads = from

        const uid = FireAuth.uid()
        if (!uid) return threads

        // Muted user IDs
        const mutedUserIds = await FireUsers.readMutedUserIds()
        if (!mutedUserIds) return null

        // Convert all threads to only unmuted threads
        let unmutedThreads: Thread[] = []
        threads.forEach(thread => {

            // ミュート中のユーザーの物以外のスレッドのみ残す
            if (!mutedUserIds.includes(thread.userId)) {
                unmutedThreads.push(thread)
            }
        })

        return unmutedThreads
    }

    static async readThreadFromCache(threadId: string): Promise<Thread | null> {

        const docRef = doc(db, "threads", threadId)

        try {
            // キャッシュから読み取り
            const docSnapFromCache = await getDocFromCache(docRef)

            // 失敗
            if (!docSnapFromCache.exists()) {
                // console.log(`Thread does not exists.`)
                return null
            }

            //成功
            // console.log(`Read 1 Thread from cache.`)
            return this.toThread(docSnapFromCache)

        } catch (e) {

            try {

                // サーバーから読み取り
                const docSnapFromServer = await getDocFromServer(docRef)

                // 失敗
                if (!docSnapFromServer.exists()) {
                    // console.log(`Thread does not exists.`)
                    return null
                }

                // 成功
                // console.log(`Read 1 Thread from server.`)
                return this.toThread(docSnapFromServer)

            } catch (error) {
                
                console.log(`Thread reading failed. ${error}`)
                return null
            }

        }
    }

    static async readThreadFromServer(threadId: string): Promise<Thread | null> {

        const docRef = doc(db, "threads", threadId)

        try {
            // キャッシュから読み取り
            const docSnap = await getDocFromServer(docRef)

            // 失敗
            if (!docSnap.exists()) {
                return null
            }

            //成功
            // console.log(`Read 1 Thread from server.`)
            return this.toThread(docSnap)

        } catch (error) {

            console.log(`Thread reading failed. ${error}`)
            return null
        }
    }

    static async readRecentTags(): Promise<string[] | null> {

        const q = query(collection(db, "threads"), orderBy("createdAt", "desc"), limit(50))

        try {

            // サーバー / キャッシュから読み取り
            const querySnapshot = await getDocs(q)

            // 読み取り成功
            // console.log(`Read ${querySnapshot.size} Threads from server / cache.`)

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
            console.log(`Threads reading failed. ${error}`)
            return null
        }
    }

    static async readThreadsByTag(tag: string): Promise<Thread[] | null> {

        const q = query(collection(db, "threads"), where("tags", "array-contains", tag), limit(9999))

        try {

            // サーバー / キャッシュから読み取り
            const querySnapshot = await getDocs(q)

            // 成功
            // console.log(`Read ${querySnapshot.size} Threads from server / cache.`)

            // 配列threads
            let threads: Thread[] = []
            querySnapshot.forEach((doc) => {
                const thread = this.toThread(doc)
                threads.push(thread)
            })

            return threads

        } catch (error) {

            // 失敗
            console.log(`Threads reading failed. ${error}`)
            return null
        }
    }

    static async readThreadsByTitle(keyword: string): Promise<Thread[] | null> {

        const q = query(collection(db, "threads"), orderBy("title"), startAt(keyword), endAt(keyword + '\uf8ff'), limit(50))

        try {

            // サーバー / キャッシュから読み取り
            const querySnapshot = await getDocs(q)

            // 成功
            // console.log(`Read ${querySnapshot.size} Threads from server / cache.`)

            // 配列threads
            let threads: Thread[] = []
            querySnapshot.forEach((doc) => {
                const thread = FireThreads.toThread(doc)
                threads.push(thread)
            })

            return threads

        } catch (error) {

            // 失敗
            console.log(`Threads reading failed. ${error}`)
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

        // 二つの配列を結合
        const threads = threadsByTitle.concat(threadsByTag)

        let uniqueThreads: Thread[] = []
        let ids: string[] = []
        threads.forEach((thread) => {
            if (!ids.includes(thread.id)) {
                uniqueThreads.push(thread)
                ids.push(thread.id)
            }
        })

        const unmutedThreads = await this.toUnmutedThreads(uniqueThreads)
        if (!unmutedThreads) return null

        return unmutedThreads
    }

    static async createThread(title: string, tags: string[]): Promise<string | null> {

        const titleMax = 50
        const tagsMax = 5
        const tagMax = 30

        // titleをチェック
        if (title.length === 0 || title.length > titleMax) {
            return null
        }

        // tagsをチェック
        if (tags.length > tagsMax) {
            return null
        }

        if ((tags.filter(item => item.length === 0 || item.length > tagMax)).length > 0) {
            return null
        }

        // サインインしていないなら終了　
        const uid = FireAuth.uid()

        if (uid === null) {
            return null
        }

        try {

            const ref = await addDoc(collection(db, "threads"), {
                createdAt: serverTimestamp(),
                userId: uid,
                title: title,
                tags: tags
            })

            // console.log("Added 1 Thread.")
            return ref.id

        } catch (error) {

            console.log(`Failed to thread creation. ${error}`)
            return null
        }
    }

    static async deleteThread(threadId: string): Promise<string | null> {

        return deleteDoc(doc(db, "threads", threadId))
            .then(() => {

                // console.log("Deleted 1 Thread.")
                return threadId
            })
            .catch((error) => {

                console.log(`Fsailed to thread deletion. ${error}`)
                return null
            })
    }
}