import { useEffect, useState } from "react"
import Thread from "../../types/Thread"
import FireThread from "../../utilities/FireThread"
import progress from "../../images/progress.svg"
import ThreadRow from "./ThreadRow"

export default function SearchThreadsList(props: {keyword: string, className?: string}) {

    const [threads, setThreads] = useState<Thread[] | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    async function readThreads() {
        
        setIsLoaded(false)
        const threads = await FireThread.readThreadsByKeyword(props.keyword)
        setThreads(threads)
        setIsLoaded(true)
    }

    useEffect(() => {

        readThreads()
        // eslint-disable-next-line
    }, [props.keyword])

    return (
        <div className={props.className}>

            {!isLoaded &&
                <div className='flex justify-center p-3'>
                    <img src={progress} alt='loading' />
                </div>
            }

            {isLoaded && threads === null &&
                <div className="p-3">
                    <p className="text-gray-500 text-center">読み取りに失敗しました。</p>
                </div>
            }

            {isLoaded && threads !== null && threads.length === 0 &&
                <div className="p-3">
                    <p className="text-gray-500 text-center">結果なし</p>
                </div>
            }

            {isLoaded && threads !== null &&
                <div>
                    {threads.map((thread) => (
                        <ThreadRow key={thread.id} thread={thread}/>
                    ))}
                </div>
            }
        </div>
    )
}