import { useEffect, useState } from 'react'
import Thread from '../../types/Thread'
import { collection, query, onSnapshot } from "firebase/firestore"
import { db } from "../../utilities/firebase"

export default function HomeScreen() {

    document.title = 'Meetings'

    // States
    const [threads, setThreads] = useState<Thread[]>([])
    const [isLoaded, setIsloaded] = useState(false)

    async function startReadingThreads() {
        // リアルタイムアップデート開始
        const q = query(collection(db, "threads"));
        onSnapshot(q, (querySnapshot) => {
            // 配列threads
            let threads: Thread[] = []
            querySnapshot.forEach((doc) => {
                const id: string = doc.id
                const userId: string = doc.data().userId
                const createdAt: Date = doc.data({ serverTimestamps: "estimate" }).createdAt.toDate()
                const commentedAt: Date = doc.data({ serverTimestamps: "estimate" }).commentedAt.toDate()

                const title: string = doc.data().title
                const tags: string[] = doc.data().tags


                const thread: Thread = { id: id, userId: userId, createdAt: createdAt, commentedAt: commentedAt, title: title, tags: tags }
                threads.push(thread)
            })

            // Stateを更新
            setThreads(threads)
            setIsloaded(true)
        });
    }

    useEffect(() => {
        startReadingThreads()
    }, []);

    return (
        <div>
            <p>Home</p>

            <div>
                {threads.map((thread) => (
                    <div key={thread.id}>
                        <p>{thread.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}