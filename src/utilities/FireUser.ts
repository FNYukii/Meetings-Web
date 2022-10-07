import User from "../types/User"
import { QueryDocumentSnapshot, DocumentData, getDocFromCache, getDocFromServer, getDoc } from "firebase/firestore"
import { doc } from "firebase/firestore"
import { db } from "../utilities/firebase"

export default class FireUser {

    static toUser(document: QueryDocumentSnapshot<DocumentData>): User {
        const id: string = document.id

        const userTag: string = document.data().userTag
        const displayName: string = document.data().displayName
        const introduction: string = document.data().introduction

        const iconUrl: string = document.data().iconUrl
        const likedCommentIds: string[] = document.data().likedCommentIds

        const user: User = { id: id, userTag: userTag, displayName: displayName, introduction: introduction, iconUrl: iconUrl, likedCommentIds: likedCommentIds }
        return user
    }

    static async readUserFromCache(userId: string): Promise<User | null> {
        // キャッシュから読み取り
        const docRef = doc(db, "users", userId)
        try {
            const docSnapFromCache = await getDocFromCache(docRef)
            
            if (docSnapFromCache.exists()) {
                return this.toUser(docSnapFromCache)
            } else {
                return null
            }
        } catch (e) {

            // サーバーから読み取り
            const docSnapFromServer = await getDocFromServer(docRef)
    
            // 失敗
            if (!docSnapFromServer.exists()) {
                return null
            }
            
            // 成功
            return this.toUser(docSnapFromServer)
        }
    }

    static async readUser(userId: string): Promise<User | null> {
        const docRef = doc(db, "users", userId)
        const docSnap = await getDoc(docRef)

        // 失敗
        if (!docSnap.exists()) {
            return null
        }

        // 成功
        return this.toUser(docSnap)
    }
}