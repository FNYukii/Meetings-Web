import { useEffect, useState } from 'react'
import Thread from '../../types/Thread'
import { collection, query, onSnapshot, orderBy, limit } from "firebase/firestore"
import { db } from "../../utilities/firebase"
import FireThread from '../../utilities/FireThread'
import ThreadRow from '../parts/ThreadRow'
import TitleBar from '../parts/TitleBar'
import progress from "../../images/progress.svg"

export default function HomeScreen() {

    document.title = 'Meetings'

    // States
    const [threads, setThreads] = useState<Thread[]>([])
    const [isLoaded, setIsloaded] = useState(false)

    async function startReadingThreads() {
        const q = query(collection(db, "threads"), orderBy("commentedAt", "desc"), limit(50));
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
            <TitleBar text='ホーム' isShowBackButton={false}/>

            {!isLoaded &&
                <div className='flex justify-center'>
                    <img src={progress} alt='loading'/>
                </div>
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