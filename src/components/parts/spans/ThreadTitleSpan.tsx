import { useEffect, useState } from "react"
import Thread from "../../../entities/Thread"
import FireThreads from "../../../utilities/FireThreads"

function ThreadTitleSpan(props: {threadId: string}) {

    const [thread, setThread] = useState<Thread | null>(null)

    async function readThread() {

        const thread = await FireThreads.readThreadFromCache(props.threadId)
        setThread(thread)

        document.title = `${thread?.title ?? "スレッド"} - Meetings`
    }

    useEffect(() => {

        readThread()
        // eslint-disable-next-line
    }, [])

    return (
        <span className='font-bold text-lg ml-6'>{thread?.title ?? ""}</span>
    )
}

export default ThreadTitleSpan