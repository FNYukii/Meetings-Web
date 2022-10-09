import { useEffect, useState } from "react"
import FireThread from "../../utilities/FireThread"

export default function RecentTagRow(props: { tag: string }) {

    const [numberOfThread, setNumberOfThread] = useState<number | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    async function readThreads() {
        const threads = await FireThread.readThreadsByTag(props.tag)
        setNumberOfThread(threads?.length ?? null)
        setIsLoaded(true)
    }

    useEffect(() => {
        readThreads()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <p>{props.tag}</p>

            {!isLoaded &&
                <div className="bg-zinc-100 dark:bg-zinc-800 w-20">
                    <p className="text-gray-500 text-sm text-transparent">-</p>
                </div>
            }

            {isLoaded && numberOfThread === null &&
                <p className="text-gray-500">---</p>
            }

            {isLoaded && numberOfThread !== null &&
                <p className="text-gray-500 text-sm">{numberOfThread}件のスレッド</p>
            }
        </div>
    )
}