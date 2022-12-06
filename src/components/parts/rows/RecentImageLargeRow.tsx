import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Comment from "../../../entities/Comment";
import Thread from "../../../entities/Thread";
import ExDate from "../../../utilities/ExDate";
import FireThreads from "../../../utilities/FireThreads";

function RecentImageLargeRow(props: { comment: Comment }) {

    const [thread, setThread] = useState<Thread | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    async function readThread() {
        const thread = await FireThreads.readThreadFromCache(props.comment.threadId)
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
                <div className="w-full aspect-video bg-gray-100 dark:bg-gray-900"></div>
            }

            {isLoaded && thread === null &&
                <div className="p-2">
                    <p className="text-gray-500 text-center">読み取りに失敗しました。</p>
                </div>
            }

            {isLoaded && thread !== null &&
                <div className="relative w-full aspect-video">

                    <div className="absolute top-0 left-0 w-full h-full bg-gray-100 dark:bg-gray-900"></div>

                    <img src={props.comment.imageUrls[0]} alt="Attached to comment" className="absolute top-0 left-0 w-full h-full object-cover" />

                    <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black/50 to-transparent">
                        
                        <div className="w-full flex justify-between">

                            <span className="text-white font-bold">{thread.title}</span>
                            <span className="text-gray-300">{ExDate.toHowManyAgoString(thread.createdAt)}</span>
                        </div>

                        <p className="text-white text-gray-300">{props.comment.text}</p>
                    </div>

                    <NavLink to={`/threads/${props.comment.threadId}`} className="absolute top-0 left-0 w-full h-full hover:bg-black/10 dark:hover:bg-white/10 transition" />
                </div>
            }
        </div>
    )
}

export default RecentImageLargeRow