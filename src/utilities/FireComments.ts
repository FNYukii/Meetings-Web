import { addDoc, collection, deleteDoc, doc, endAt, getDocFromCache, getDocFromServer, getDocs, getDocsFromCache, getDocsFromServer, limit, orderBy, query, QueryDocumentSnapshot, serverTimestamp, startAt, where } from "firebase/firestore"
import Comment from "../entities/Comment"
import FireAuth from "./FireAuth"
import { db } from "./firebase"
import FireThreads from "./FireThreads"
import FireUsers from "./FireUsers"

export default class FireComments {

    static toComment(document: QueryDocumentSnapshot): Comment {

        const id: string = document.id ?? ""
        const userId: string = document.data().userId ?? ""
        const createdAt: Date = document.data({ serverTimestamps: "estimate" }).createdAt.toDate() ?? new Date()

        const threadId: string = document.data().threadId ?? ""
        const text: string = document.data().text ?? ""
        const imageUrls: string[] = document.data().imageUrls ?? []

        const comment: Comment = { id: id, userId: userId, createdAt: createdAt, threadId: threadId, text: text, imageUrls: imageUrls }
        return comment
    }

    static async readCommentFromCache(commentId: string): Promise<Comment | null> {

        const docRef = doc(db, "comments", commentId)

        try {

            // キャッシュから読み取り
            const docSnapFromCache = await getDocFromCache(docRef)

            // 失敗
            if (!docSnapFromCache.exists()) {
                return null
            }

            //成功
            // console.log(`Read 1 Comment from cache.`)
            return this.toComment(docSnapFromCache)

        } catch (e) {

            // サーバーから読み取り
            const docSnapFromServer = await getDocFromServer(docRef)

            // 失敗
            if (!docSnapFromServer.exists()) {
                return null
            }

            // 成功
            console.log(`Read 1 Comment from server.`)
            return this.toComment(docSnapFromServer)
        }
    }

    static async readFirstCommentFromCache(commentId: string): Promise<Comment | null> {


        // クエリを作成
        const q = query(collection(db, "comments"), where("threadId", "==", commentId), orderBy("createdAt"), limit(1))

        try {
            // キャッシュから読み取り
            const querySnapshot = await getDocsFromCache(q)

            // 成功
            // console.log(`Read ${querySnapshot.size} Comments from cache.`)

            // 配列comments
            let comments: Comment[] = []
            querySnapshot.forEach((doc) => {
                const comment = this.toComment(doc)
                comments.push(comment)
            })

            // 0件なら終了
            if (comments.length === 0) {
                // eslint-disable-next-line
                throw 'e'
            }

            // 成功
            return comments[0]

        } catch (e) {

            try {
                // キャッシュから読み取り
                const querySnapshot = await getDocsFromServer(q)
    
                // 成功
                console.log(`Read ${querySnapshot.size} Comments from server.`)
    
                // 配列comments
                let comments: Comment[] = []
                querySnapshot.forEach((doc) => {
                    const comment = this.toComment(doc)
                    comments.push(comment)
                })
    
                // 0件なら終了
                if (comments.length === 0) {
                    return null
                }
    
                // 成功
                return comments[0]
    
            } catch (e) {
    
                return null
            }
        }
    }

    static async readCommentsPostedByUser(userId: string): Promise<Comment[] | null> {

        const q = query(collection(db, "comments"), where("userId", "==", userId), orderBy("createdAt", "desc"), limit(50))

        try {

            // サーバーorキャッシュから読み取り
            const querySnapshot = await getDocs(q)

            // 成功
            console.log(`Read ${querySnapshot.size} Comments from server / cache.`)

            // 配列comments
            let comments: Comment[] = []
            querySnapshot.forEach((doc) => {
                const comment = this.toComment(doc)
                comments.push(comment)
            })

            return comments

        } catch (error) {

            // 失敗
            return null
        }
    }

    static async readCommentsLikedByUser(userId: string): Promise<Comment[] | null> {

        // userをサーバーから読み取る
        const user = await FireUsers.readUser(userId)

        // userが読み取れなかったら失敗
        if (user === null) {
            return null
        }

        // userドキュメントのlikedCommentIdsフィールドの値を取得
        const likedCommentIds = user.likedCommentIds

        // userがいいねしたコメントが0件なら終了
        if (likedCommentIds.length === 0) {
            return []
        }

        // likedCommentIdsの要素の数だけ、そのcommentを読み取る
        let likedComments: Comment[] = []
        await Promise.all(likedCommentIds.map(async (likedCommentId) => {

            // キャッシュからcommentを読み取る
            const comment = await FireComments.readCommentFromCache(likedCommentId)

            // 失敗
            if (comment === null) {
                return
            }

            // 成功
            likedComments.push(comment)
        }))

        likedComments = likedComments.reverse()
        return likedComments
    }

    static async readCommentsWithImages(): Promise<Comment[] | null> {

        const q = query(collection(db, "comments"), where("imageUrls", "!=", []), limit(10))

        try {

            // サーバーorキャッシュから読み取り
            const querySnapshot = await getDocs(q)

            // 成功
            console.log(`Read ${querySnapshot.size} Comments from server / cache.`)

            // 配列comments
            let comments: Comment[] = []
            querySnapshot.forEach((doc) => {
                const comment = this.toComment(doc)
                comments.push(comment)
            })

            return comments

        } catch (error) {

            // 失敗
            return null
        }
    }

    static async readCommentsByKeyword(keyword: string): Promise<Comment[] | null> {

        const q = query(collection(db, "comments"), orderBy("text"), startAt(keyword), endAt(keyword + '\uf8ff'), limit(50))

        try {

            // サーバー / キャッシュから読み取り
            const querySnapshot = await getDocs(q)

            // 成功
            console.log(`Read ${querySnapshot.size} Comments from server / cache.`)

            // Comments
            let comments: Comment[] = []
            querySnapshot.forEach((doc) => {
                const comment = this.toComment(doc)
                comments.push(comment)
            })

            return comments

        } catch (error) {

            // 失敗
            return null
        }
    }

    static async createComment(threadId: string, text: string, imageUrls: string[]): Promise<string | null> {

        // 制限
        const textMax = 300
        const imageUrlsMax = 4

        // threadIdを確認
        const thread = await FireThreads.readThreadFromServer(threadId)
        if (!thread) {
            return null
        }

        // textを確認
        if (text.length === 0 || text.length > textMax || !text.match(/\S/g)) {
            return null
        }

        // imageUrlsを確認
        if (imageUrls.length > imageUrlsMax) {
            return null
        }

        // サインインしていないなら終了　
        const uid = FireAuth.uid()

        if (uid === null) {
            return null
        }

        try {

            const ref = await addDoc(collection(db, "comments"), {
                createdAt: serverTimestamp(),
                threadId: threadId,
                userId: uid,
                text: text,
                imageUrls: imageUrls
            })

            console.log("Added 1 Comment.")
            return ref.id

        } catch (error) {

            console.log(`Failed to comment creation. ${error}`)
            return null
        }
    }

    static async deleteComment(commentId: string): Promise<string | null> {

        return deleteDoc(doc(db, "comments", commentId))
            .then(() => {

                console.log("Deleted 1 Comment.")
                return commentId
            })
            .catch((error) => {

                console.log(`Failed to comment deletion. ${error}`)
                return null
            })
    }
}