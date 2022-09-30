import { useEffect, useState } from 'react'
import Thread from '../../types/Thread'
import { collection, query, onSnapshot } from "firebase/firestore"
import { db } from "../../utilities/firebase"
import FireUser from '../../utilities/FireThread'

export default function HomeScreen() {

    document.title = 'Meetings'

    // States
    const [threads, setThreads] = useState<Thread[]>([])
    const [isLoaded, setIsloaded] = useState(false)

    async function startReadingThreads() {
        const q = query(collection(db, "threads"));
        onSnapshot(q, (querySnapshot) => {
            // 配列threads
            let threads: Thread[] = []
            querySnapshot.forEach((doc) => {
                const thread = FireUser.toThread(doc)
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

            {!isLoaded &&
                <div></div>
            }

            {isLoaded &&
                <div>
                    {threads.map((thread) => (
                        <div key={thread.id}>
                            <p>{thread.title}</p>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}