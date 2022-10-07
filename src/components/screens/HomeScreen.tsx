import { useEffect, useState } from 'react'
import Thread from '../../types/Thread'
import { collection, query, onSnapshot, orderBy, limit } from "firebase/firestore"
import { db } from "../../utilities/firebase"
import FireThread from '../../utilities/FireThread'
import ThreadRow from '../parts/ThreadRow'
import progress from "../../images/progress.svg"

export default function HomeScreen() {

    document.title = 'Meetings'

    // States
    const [threads, setThreads] = useState<Thread[]>([])
    const [isLoaded, setIsloaded] = useState(false)

    async function startReadingThreads() {
        const q = query(collection(db, "threads"), orderBy("commentedAt", "desc"), limit(50))
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
        })
    }

    useEffect(() => {
        startReadingThreads()
    }, [])

    return (
        <div>
            <div className='h-14 sticky top-0 bg-white/70 dark:bg-black/70 z-20 backdrop-blur px-3 flex items-center'>
                <span className='font-bold text-lg'>ホーム</span>
            </div>

            {!isLoaded &&
                <div className='flex justify-center'>
                    <img src={progress} alt='loading' />
                </div>
            }

            {isLoaded &&
                <div className='mt-1'>
                    {
                        threads.map((thread) => (
                            <ThreadRow thread={thread} key={thread.id} />
                        ))
                    }
                </div>
            }
        </div >
    )
}