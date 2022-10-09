import { useEffect, useState } from "react";
import { AiOutlineProfile } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import Thread from "../../types/Thread";
import FireThread from "../../utilities/FireThread";

export default function CommentThreadTitle(props: { threadId: string }) {

    const [thread, setThread] = useState<Thread | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    async function readThread() {
        const thread = await FireThread.readThreadFromCache(props.threadId)
        setThread(thread)
        setIsLoaded(true)
    }

    useEffect(() => {
        readThread()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
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