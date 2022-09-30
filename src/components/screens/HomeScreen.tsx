import { useEffect, useState } from 'react'
import Thread from '../../types/Thread'
import { collection, query, onSnapshot } from "firebase/firestore"
import { db } from "../../utilities/firebase"
import FireUser from '../../utilities/FireThread'
import styled from 'styled-components'
import ThreadRow from '../parts/ThreadRow'

export default function HomeScreen() {

    document.title = 'Meetings'

    const TitleBarDiv = styled.div`
        border-bottom: 1px solid #AAAA;
        padding: 8px;
        font-size: large;
        font-weight: bold;
    `

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

            <TitleBarDiv>
                <span>ホーム</span>
            </TitleBarDiv>

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