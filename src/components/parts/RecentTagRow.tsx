import { useEffect, useState } from "react"
import FireThread from "../../utilities/FireThread"

export default function RecentTagRow(props: {tag: string}) {

    const [numberOfThread, setNumberOfThread] = useState<number | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    async function readThreads() {
        const threads = await FireThread.readThreadsByTag(props.tag)
        setNumberOfThread(threads?.length ?? null)
    }

    useEffect(() => {
        readThreads()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <p>{props.tag}</p>
            <p>{numberOfThread ?? "---"}</p>
        </div>
    )
}