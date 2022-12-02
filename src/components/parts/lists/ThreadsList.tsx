import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import Thread from "../../../entities/Thread"
import { db } from "../../../utilities/firebase"
import FireThreads from "../../../utilities/FireThreads"
import ThreadRow from "../rows/ThreadRow"
import ProgressImage from "../images/ProgressImage"

function ThreadsList() {
    // States
    const [threads, setThreads] = useState<Thread[] | null>(null)
    const [isLoaded, setIsloaded] = useState(false)

    async function listenThreads() {

        const q = query(collection(db, "threads"), orderBy("createdAt", "desc"), limit(50))

        onSnapshot(q, async (querySnapshot) => {

            if (querySnapshot.metadata.hasPendingWrites) return

            // 成功
            // console.log(`Read ${querySnapshot.size} Threads from server / cache.`)

            // 配列threads
            let threads: Thread[] = []
            querySnapshot.forEach((doc) => {
                const thread = FireThreads.toThread(doc)
                threads.push(thread)
            })

            const unmutedThreads = await FireThreads.toUnmutedThreads(threads)
            if (!unmutedThreads) {
                setIsloaded(true)
                return
            }

            // Stateを更新
            setThreads(unmutedThreads)
            setIsloaded(true)

        }, (error) => {

            console.log(`Threads reading failed. ${error}`)
            setIsloaded(true)
        })
    }

    useEffect(() => {

        listenThreads()
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

export default ThreadsList