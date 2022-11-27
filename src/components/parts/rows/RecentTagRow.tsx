import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import FireThreads from "../../../utilities/FireThreads"
import RecentTagMenu from "../menus/RecentTagMenu"

function RecentTagRow(props: { tag: string, removeTag: (tag: string) => void }) {

    const [numberOfThread, setNumberOfThread] = useState<number | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    async function readThreads() {
        const threads = await FireThreads.readThreadsByTag(props.tag)
        setNumberOfThread(threads?.length ?? null)
        setIsLoaded(true)
    }

    useEffect(() => {
        readThreads()
        // eslint-disable-next-line
    }, [])

    return (
        <div className={`relative pl-3 pr-2 py-2`}>

            <NavLink to={`/search?keyword=${props.tag}`} className="absolute top-0 left-0 w-full h-full hover:bg-zinc-500/10 dark:hover:bg-zinc-500/20 transition" />

            <div>
                {!isLoaded &&
                    <div className="flex justify-between">
                        <span className="text-transparent bg-zinc-200 dark:bg-zinc-800">------</span>
                    </div>
                }

                {isLoaded && numberOfThread !== null &&
                    <div className="flex justify-between">
                        <span>{props.tag}</span>
                        <RecentTagMenu tag={props.tag} removeTag={props.removeTag} />
                    </div>
                }
            </div>

            <div className="mt-1">
                {!isLoaded &&
                    <span className="text-sm text-transparent bg-zinc-200 dark:bg-zinc-800">----------</span>
                }

                {isLoaded && numberOfThread === null &&
                    <p className="text-gray-500">---</p>
                }

                {isLoaded && numberOfThread !== null &&
                    <p className="text-gray-500 text-sm">{numberOfThread}件のスレッド</p>
                }
            </div>
        </div>
    )
}

export default RecentTagRow