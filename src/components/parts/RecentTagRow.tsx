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
                <p className="text-gray-500 text-sm">-</p>
            }

            {isLoaded && numberOfThread === null &&
                <p className="text-gray-500">x</p>
            }

            {isLoaded && numberOfThread !== null &&
                <p className="text-gray-500 text-sm">{numberOfThread}件のスレッド</p>
            }
        </div>
    )
}