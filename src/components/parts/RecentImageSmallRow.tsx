import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import Comment from "../../types/Comment"
import Thread from "../../types/Thread"
import ExDate from "../../utilities/ExDate"
import FireThread from "../../utilities/FireThread"

export default function RecentImageSmallRow(props: { comment: Comment }) {

    const [thread, setThread] = useState<Thread | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    async function readThread() {
        const thread = await FireThread.readThreadFromCache(props.comment.threadId)
        setThread(thread)
        setIsLoaded(true)
    }

    useEffect(() => {
        readThread()
        // eslint-disable-next-line
    }, [])

    return (

        <div>
            {!isLoaded &&
                <div className="w-full h-20 bg-zinc-100 dark:bg-zinc-900"></div>
            }

            {isLoaded && thread === null &&
                <div className="p-2">
                    <p className="text-gray-500 text-center">読み取りに失敗しました。</p>
                </div>
            }

            {isLoaded && thread !== null &&
                <div className="relative w-full flex justify-between p-3">

                    <NavLink to={`/threads/${props.comment.threadId}`} className="absolute top-0 left-0 w-full h-full hover:bg-black/10" />

                    <div className="w-full">

                        <div className="w-full flex justify-between">

                            <span className="font-bold">{thread.title}</span>
                            <span className="text-gray-500">{ExDate.toHowManyAgoString(thread.commentedAt)}</span>
                        </div>

                        <p className="text-gray-500">{props.comment.text}</p>
                    </div>

                    <img src={props.comment.imageUrls[0]} alt="Attached to comment" className="ml-3 w-20 h-20 object-cover rounded-xl border border-zinc-200 dark:border-zinc-800" />
                </div>
            }
        </div>
    )
}