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
    const [threads, setThreads] = useState<Thread[] | null>(null)
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
            <div className='sticky top-0 z-20'>
                <div className='relative h-14 px-3 flex items-center bg-white/70 dark:bg-black/70 backdrop-blur'>

                    <div className='absolute top-0 left-0 w-full h-full cursor-pointer' onClick={() => window.scrollTo(0, 0)}></div>

                    <span className='font-bold text-lg'>ホーム</span>
                </div>
            </div>

            {!isLoaded &&
                <div className='flex justify-center'>
                    <img src={progress} alt='loading' />
                </div>
            }

            {isLoaded && threads === null &&
                <div className="p-2">
                    <p className="text-gray-500 text-center">読み取りに失敗しました。</p>
                </div>
            }

            {isLoaded && threads !== null &&
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