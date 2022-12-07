import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import FireThreads from "../../../utilities/FireThreads"
import RecentTagMenu from "../menus/RecentTagMenu"

function RecentTagRow(props: { tag: string, removeTag: (tag: string) => void }) {

    const [numberOfThread, setNumberOfThread] = useState<number | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    async function readThreads() {

        // まずはキャッシュから読み取り
        const threadsFromCache = await FireThreads.readThreadsByTagFromCache(props.tag)
        setNumberOfThread(threadsFromCache?.length ?? null)

        // その後サーバーから読み取り
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

            <NavLink to={`/search?keyword=${props.tag}`} className="absolute top-0 left-0 w-full h-full hover:bg-gray-500/10 dark:hover:bg-gray-500/20 transition" />

            <div>
                {!isLoaded &&
                    <div>
                        <div className="flex justify-between">

                            <span>{props.tag}</span>
                            <RecentTagMenu tag={props.tag} removeTag={props.removeTag} />
                        </div>

                        <p className="text-gray-500 text-sm">{numberOfThread}件のスレッド</p>
                    </div>
                }

                {isLoaded && !numberOfThread &&
                    <div className="p-3">
                        <p className="text-gray-500 text-center">読み取りに失敗しました</p>
                    </div>
                }

                {isLoaded && numberOfThread &&
                    <div>
                        <div className="flex justify-between">

                            <span>{props.tag}</span>
                            <RecentTagMenu tag={props.tag} removeTag={props.removeTag} />
                        </div>

                        <p className="text-gray-500 text-sm">{numberOfThread}件のスレッド</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default RecentTagRow