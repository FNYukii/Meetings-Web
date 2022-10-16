import { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import Thread from "../../entities/Thread"
import FireThreads from "../../utilities/FireThreads"
import BackButton from "../parts/buttons/BackButton"
import { AiOutlinePlus } from "react-icons/ai"
import CommentsInThreadList from "../parts/lists/CommentsInThreadList"

export default function ThreadScreen() {

    const location = useLocation()
    const { threadId } = useParams()
    const [thread, setThread] = useState<Thread | null>(null)

    async function readThread() {

        const thread = await FireThreads.readThreadFromCache(threadId!)
        setThread(thread)

        document.title = `${thread?.title ?? "スレッド"} - Meetings`
    }

    useEffect(() => {

        readThread()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <div className='sticky top-0 z-20'>
                <div className='relative h-14 pl-1 pr-1 flex items-center justify-between bg-white/70 dark:bg-black/70 backdrop-blur'>

                    <div className='absolute top-0 left-0 w-full h-full cursor-pointer' onClick={() => window.scrollTo(0, 0)}></div>

                    <div className="flex items-center">
                        <BackButton />
                        <span className='font-bold text-lg ml-6'>{thread?.title ?? ""}</span>
                    </div>

                    <Link to={`/threads/${threadId}/new`} state={{ previousPath: location.pathname }} className="z-10 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900">
                        <AiOutlinePlus className="text-2xl" />
                    </Link>
                </div>
            </div>

            <CommentsInThreadList threadId={threadId!}/>
        </div>
    )
}