import User from "../types/User"
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore"
import { doc, getDoc } from "firebase/firestore"
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

    static async readUser(userId: string): Promise<User | null> {
        // Userドキュメントを読み取り
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        // 失敗
        if (!docSnap.exists()) {
            return null
        }
        
        // 成功
        const document = docSnap
        const user = this.toUser(document)
        return user
    }
}