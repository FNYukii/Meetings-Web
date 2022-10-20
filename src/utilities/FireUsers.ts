import User from "../entities/User"
import { QueryDocumentSnapshot, DocumentData, getDocFromCache, getDocFromServer, getDoc, query, collection, where, getDocs, getDocsFromCache, getDocsFromServer, orderBy, startAt, endAt, limit, setDoc, serverTimestamp, updateDoc } from "firebase/firestore"
import { doc } from "firebase/firestore"
import { db } from "./firebase"

export default class FireUsers {

    static toUser(document: QueryDocumentSnapshot<DocumentData>): User {

        const id: string = document.id ?? ""

        const userTag: string = document.data().userTag ?? ""
        const displayName: string = document.data().displayName ?? ""
        const introduction: string = document.data().introduction ?? ""

        const iconUrl: string = document.data().iconUrl ?? ""
        const likedCommentIds: string[] = document.data().likedCommentIds ?? []

        const user: User = { id: id, userTag: userTag, displayName: displayName, introduction: introduction, iconUrl: iconUrl, likedCommentIds: likedCommentIds }
        return user
    }

    static async readUserFromCache(userId: string): Promise<User | null> {

        const docRef = doc(db, "users", userId)

        try {

            // キャッシュから読み取り
            const docSnapFromCache = await getDocFromCache(docRef)

            // 失敗
            if (!docSnapFromCache.exists()) {
                return null
            }

            //成功
            // console.log("Read 1 User from cache.")
            return this.toUser(docSnapFromCache)

        } catch (e) {

            // サーバーから読み取り
            const docSnapFromServer = await getDocFromServer(docRef)

            // 失敗
            if (!docSnapFromServer.exists()) {
                return null
            }

            // 成功
            console.log("Read 1 User from server.")
            return this.toUser(docSnapFromServer)
        }
    }

    static async readUser(userId: string): Promise<User | null> {

        const docRef = doc(db, "users", userId)

        try {

            const docSnap = await getDoc(docRef)

            // 失敗
            if (!docSnap.exists()) {
                return null
            }

            // 成功
            console.log("Read 1 User from server / cache.")
            return this.toUser(docSnap)

        } catch (error) {

            // 失敗
            return null
        }
    }

    static async readLikedUsersFromCache(commentId: string): Promise<User[] | null> {

        const q = query(collection(db, "users"), where("likedCommentIds", "array-contains", commentId), limit(9999))

        try {

            // キャッシュから読み取り
            const querySnapshot = await getDocsFromCache(q)

            // 成功
            // console.log(`Read ${querySnapshot.size} Users from cache.`)

            // 配列users
            let users: User[] = []
            querySnapshot.forEach((doc) => {
                const user = this.toUser(doc)
                users.push(user)
            })
            return users

        } catch (error) {

            try {
                // サーバーから読み取り
                const querySnapshot = await getDocsFromServer(q)

                // 成功
                console.log(`Read ${querySnapshot.size} Users from server.`)

                // 配列users
                let users: User[] = []
                querySnapshot.forEach((doc) => {
                    const user = this.toUser(doc)
                    users.push(user)
                })
                return users

            } catch (error) {

                // 失敗
                return null
            }
        }
    }

    static async readLikedUsers(commentId: string): Promise<User[] | null> {

        const q = query(collection(db, "users"), where("likedCommentIds", "array-contains", commentId), limit(9999))

        try {

            // サーバーorキャッシュから読み取り
            const querySnapshot = await getDocs(q)

            // 成功
            console.log(`Read ${querySnapshot.size} Users from server / cache.`)

            // 配列users
            let users: User[] = []
            querySnapshot.forEach((doc) => {
                const user = this.toUser(doc)
                users.push(user)
            })

            return users
        } catch (error) {

            // 失敗
            return null
        }
    }

    static async readUsersByKeyword(keyword: string): Promise<User[] | null> {

        const q = query(collection(db, "users"), orderBy("displayName"), startAt(keyword), endAt(keyword + '\uf8ff'), limit(50))

        try {

            // サーバー / キャッシュから読み取り
            const querySnapshot = await getDocs(q)

            // 成功
            console.log(`Read ${querySnapshot.size} Users from server / cache.`)

            // Users
            let users: User[] = []
            querySnapshot.forEach((doc) => {
                const thread = this.toUser(doc)
                users.push(thread)
            })

            return users

        } catch (error) {

            // 失敗
            return null
        }
    }

    static async readIsUserTagDuplicate(userTag: string): Promise<boolean | null> {

        const q = query(collection(db, "users"), where("userTag", "==", userTag))

        try {
            // サーバーから読み取り
            const querySnapshot = await getDocsFromServer(q)

            // 成功
            console.log(`Read ${querySnapshot.size} Users from server.`)

            // 重複している
            if (querySnapshot.size !== 0) {
                return true
            }

            // 重複していない
            return false

        } catch (error) {

            // 失敗
            return null
        }
    }

    static async createUser(uid: string, displayName: string, userTag: string): Promise<string | null> {

        try {

            await setDoc(doc(db, "users", uid), {
                createdAt: serverTimestamp(),
                displayName: displayName,
                userTag: userTag
            })

            console.log("Added 1 User.")

            return uid

        } catch (error) {

            return null
        }
    }

    static async updateUser(userId: string, displayName: string, userTag: string, introduction: string, iconUrl: string | null): Promise<string | null> {

        const ref = doc(db, "users", userId)

        try {

            await updateDoc(ref, {
                displayName: displayName,
                userTag: userTag,
                introduction: introduction
            })

            console.log(`Updated 1 User.`)

            return ""
            
        } catch (error) {
            
            console.log(`Failed to update User. ${error}`)
            return null
        }
    }
}