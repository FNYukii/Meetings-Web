import { useEffect, useState } from 'react'
import Thread from '../../types/Thread'
import { collection, query, onSnapshot, orderBy } from "firebase/firestore"
import { db } from "../../utilities/firebase"
import FireThread from '../../utilities/FireThread'
import ThreadRow from '../parts/ThreadRow'

export default function HomeScreen() {

    document.title = 'Meetings'

    // States
    const [threads, setThreads] = useState<Thread[]>([])
    const [isLoaded, setIsloaded] = useState(false)

    async function startReadingThreads() {
        const q = query(collection(db, "threads"), orderBy("createdAt", "desc"));
        onSnapshot(q, (querySnapshot) => {
            // 配列threads
            let threads: Thread[] = []
            querySnapshot.forEach((doc) => {
                const thread = FireThread.toThread(doc)
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
            <div className='p-2 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 bg-white dark:bg-black z-20'>
                <span className='font-bold text-lg'>ホーム</span>
            </div>

            {!isLoaded &&
                <div></div>
            }

            {isLoaded &&
                <div>
                    {threads.map((thread) => (
                        <ThreadRow thread={thread} key={thread.id}/>
                    ))}
                </div>
            }
        </div>
    )
}