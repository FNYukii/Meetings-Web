import User from "../types/User"
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore"

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
}