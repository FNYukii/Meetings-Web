import User from "../entities/User"
import { QueryDocumentSnapshot, DocumentData, getDocFromCache, getDocFromServer, getDoc, query, collection, where, getDocs, getDocsFromCache, getDocsFromServer, orderBy, startAt, endAt, limit, setDoc, serverTimestamp, updateDoc, arrayUnion, arrayRemove, DocumentSnapshot } from "firebase/firestore"
import { doc } from "firebase/firestore"
import { db } from "./firebase"
import FireAuth from "./FireAuth"
import ExString from "./ExString"

export default class FireUsers {

    static toUser(document: QueryDocumentSnapshot<DocumentData>): User {

        const id: string = document.id ?? ""

        const userTag: string = document.data().userTag ?? ""
        const displayName: string = document.data().displayName ?? ""
        const introduction: string = document.data().introduction ?? ""

        const iconUrl: string = document.data().iconUrl
        const likedCommentIds: string[] = document.data().likedCommentIds ?? []
        const mutedUserIds: string[] = document.data().mutedUserIds ?? []

        const user: User = { id: id, userTag: userTag, displayName: displayName, introduction: introduction, iconUrl: iconUrl, likedCommentIds: likedCommentIds, mutedUserIds }
        return user
    }

    static toUserFromDocumentSnapshot(document: DocumentSnapshot<DocumentData>) {

        const id: string = document.id ?? ""

        const userTag: string = document.get("userTag") ?? ""
        const displayName: string = document.get("displayName") ?? ""
        const introduction: string = document.get("introduction") ?? ""

        const iconUrl: string = document.get("iconUrl")
        const likedCommentIds: string[] = document.get("likedCommentIds") ?? []
        const mutedUserIds: string[] = document.get("mutedUserIds") ?? []

        const user: User = { id: id, userTag: userTag, displayName: displayName, introduction: introduction, iconUrl: iconUrl, likedCommentIds: likedCommentIds, mutedUserIds }
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
            // console.log("Read 1 User from server.")
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
            // console.log("Read 1 User from server / cache.")
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
                // console.log(`Read ${querySnapshot.size} Users from server.`)

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
            // console.log(`Read ${querySnapshot.size} Users from server / cache.`)

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
            // console.log(`Read ${querySnapshot.size} Users from server / cache.`)

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

        const uid = FireAuth.uid()
        if (uid === null) {
            return null
        }

        const q = query(collection(db, "users"), where("userTag", "==", userTag))

        try {
            // サーバーから読み取り
            const querySnapshot = await getDocsFromServer(q)

            // 成功
            // console.log(`Read ${querySnapshot.size} Users from server.`)

            // Users
            let users: User[] = []
            querySnapshot.forEach((doc) => {
                const thread = this.toUser(doc)
                users.push(thread)
            })

            let usersWithoutMe: User[] = []
            users.forEach((user) => {
                const userId = user.id
                if (userId !== uid) {
                    usersWithoutMe.push(user)
                }
            })

            if (usersWithoutMe.length > 0) {
                return true
            } else {
                return false
            }

        } catch (error) {

            // 失敗
            return null
        }
    }

    static async readMutedUserIds(): Promise<string[] | null> {

        // 非ログイン状態なら失敗
        const uid = FireAuth.uid()
        if (!uid) return null

        // ミュートしているユーザーのIDを取得
        const user = await this.readUser(uid)
        if (!user) return null

        return user.mutedUserIds
    }

    static async createUser(uid: string, displayName: string): Promise<string | null> {

        const displayNameMax = 30

        if (displayName.length === 0 || displayName.length > displayNameMax) {
            return null
        }

        try {

            await setDoc(doc(db, "users", uid), {
                createdAt: serverTimestamp(),
                displayName: displayName,
                userTag: ExString.randomText()
            })

            // console.log("Added 1 User.")

            return uid

        } catch (error) {

            return null
        }
    }

    static async updateUser(displayName: string, userTag: string, introduction: string, iconUrl: string | null): Promise<string | null> {

        const displayNameMax = 30
        const userTagMax = 30
        const introductionMax = 300

        // displayNameをチェック
        if (displayName.length === 0 || displayName.length > displayNameMax) {
            return null
        }

        // userTagの形式をチェック
        if (!userTag.match(/^\w{5,}$/)) {
            return null
        }

        if (userTag.length < 2 || userTag.length > userTagMax) {
            return null
        }

        // userTagの重複をチェック
        const isUserTagDuplicate = await FireUsers.readIsUserTagDuplicate(userTag)

        if (isUserTagDuplicate === null) {
            alert("ユーザータグの重複の確認に失敗しました。")
            return null
        }

        if (isUserTagDuplicate) {
            alert("そのユーザータグは既に利用されています。")
            return null
        }

        // introductionを確認
        if (introduction.length > introductionMax) {
            return null
        }

        // ログイン状態をチェック
        const uid = FireAuth.uid()
        if (uid === null) {
            
            return null
        }

        // Userドキュメントを更新
        const ref = doc(db, "users", uid)

        try {

            await updateDoc(ref, {
                displayName: displayName,
                userTag: userTag,
                introduction: introduction,
                iconUrl: iconUrl
            })

            // console.log(`Updated 1 User.`)

            return uid

        } catch (error) {

            // console.log(`Failed to update User. ${error}`)
            return null
        }
    }

    static async likeComment(commentId: string): Promise<string | null> {

        // サインインしていないなら終了　
        const uid = FireAuth.uid()

        if (uid === null) {
            return null
        }

        const ref = doc(db, "users", uid)

        try {

            await updateDoc(ref, {
                likedCommentIds: arrayUnion(commentId)
            })

            // console.log(`Updated 1 User.`)

            return uid

        } catch (error) {

            // console.log(`Failed to update User. ${error}`)
            return null
        }
    }

    static async unlikeComment(commentId: string): Promise<string | null> {

        // サインインしていないなら終了　
        const uid = FireAuth.uid()

        if (uid === null) {
            return null
        }

        const ref = doc(db, "users", uid)

        try {

            await updateDoc(ref, {
                likedCommentIds: arrayRemove(commentId)
            })

            // console.log(`Updated 1 User.`)

            return uid

        } catch (error) {

            // console.log(`Failed to update User. ${error}`)
            return null
        }
    }
}