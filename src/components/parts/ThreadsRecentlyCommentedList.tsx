import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import Thread from "../../types/Thread"
import { db } from "../../utilities/firebase"
import FireThread from "../../utilities/FireThread"
import ThreadRow from "./ThreadRow"
import ProgressImage from "./ProgressImage"

export default function ThreadsRecentlyCommentedList() {

    // States
    const [threads, setThreads] = useState<Thread[] | null>(null)
    const [isLoaded, setIsloaded] = useState(false)

    async function startReadingThreads() {

        const q = query(collection(db, "threads"), orderBy("commentedAt", "desc"), limit(50))

        onSnapshot(q, (querySnapshot) => {

            // 成功
            console.log(`Read ${querySnapshot.size} Threads from cache / server.`)

            // 配列threads
            let threads: Thread[] = []
            querySnapshot.forEach((doc) => {
                const thread = FireThread.toThread(doc)
                threads.push(thread)
            })

            // Stateを更新
            setThreads(threads)
            setIsloaded(true)

        }, (error) => {

            setIsloaded(true)
        })
    }

    useEffect(() => {

        startReadingThreads()
    }, [])

    return (
        <div>
            {!isLoaded &&
                <div className='flex justify-center p-3'>
                    <ProgressImage/>
                </div>
            }

            {isLoaded && threads === null &&
                <div className="p-2">
                    <p className="text-gray-500 text-center">読み取りに失敗しました。</p>
                </div>
            }

            {isLoaded && threads !== null && threads.length === 0 &&
                <div className="p-3">
                    <p className="text-gray-500 text-center">結果なし</p>
                </div>
            }

            {isLoaded && threads !== null &&
                <div className='mt-1'>
                    {threads.map((thread) => (
                        <ThreadRow thread={thread} key={thread.id} />
                    ))}
                </div>
            }
        </div>
    )
}