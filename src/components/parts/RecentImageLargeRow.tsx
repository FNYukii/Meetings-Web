import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Comment from "../../types/Comment";
import Thread from "../../types/Thread";
import FireThread from "../../utilities/FireThread";

export default function RecentImageLargeRow(props: { comment: Comment }) {

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
                <div className="w-full h-80 bg-zinc-100 dark:bg-zinc-900"></div>
            }

            {isLoaded && thread === null &&
                <div className="p-2">
                    <p className="text-gray-500 text-center">読み取りに失敗しました。</p>
                </div>
            }

            {isLoaded && thread !== null &&
                <div className="relative w-full h-80">

                    <div className="absolute bottom-0 w-full">

                        <div className="p-3 bg-gradient-to-t from-black/50 to-transparent">

                            <p className="text-white">{thread.title}</p>
                        </div>
                    </div>

                    <NavLink to={`/comments/${props.comment.id}`} className="absolute top-0 left-0 w-full h-full hover:bg-black/10" />

                    <img src={props.comment.imageUrls[0]} alt="Attached to comment" className="w-full h-full object-cover" />
                </div>
            }
        </div>
    )
}