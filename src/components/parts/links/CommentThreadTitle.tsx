import { useEffect, useState } from "react";
import { AiOutlineProfile } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import Thread from "../../../entities/Thread";
import FireThreads from "../../../utilities/FireThreads";

export default function CommentThreadTitle(props: { threadId: string, className?: string }) {

    const [thread, setThread] = useState<Thread | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    async function readThread() {
        const thread = await FireThreads.readThreadFromCache(props.threadId)
        setThread(thread)
        setIsLoaded(true)
    }

    useEffect(() => {
        readThread()
        // eslint-disable-next-line
    }, [])

    return (
        <div className={props.className}>
            {isLoaded && thread !== null &&
                <div className="flex">
                    <NavLink to={`/threads/${props.threadId}`} className="z-10 flex items-center gap-2 hover:underline hover:decoration-gray-500">
                        <AiOutlineProfile className="text-zinc-500 text-xl" />
                        <span className="text-zinc-500">{thread.title}</span>
                    </NavLink>
                </div>
            }
        </div>
    )
}