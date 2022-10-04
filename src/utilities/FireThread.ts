import Thread from '../types/Thread'

import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore"

export default class FireUser {

    static toThread(document: QueryDocumentSnapshot<DocumentData>): Thread {
        const id: string = document.id
        const userId: string = document.data().userId
        const createdAt: Date = document.data({ serverTimestamps: "estimate" }).createdAt.toDate()
        const commentedAt: Date = document.data({ serverTimestamps: "estimate" }).commentedAt.toDate()

        const title: string = document.data().title
        const tags: string[] = document.data().tags


        const thread: Thread = { id: id, userId: userId, createdAt: createdAt, commentedAt: commentedAt, title: title, tags: tags }
        return thread
    }
}