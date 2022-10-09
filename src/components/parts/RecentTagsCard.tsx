import { useEffect, useState } from "react"
import FireThread from "../../utilities/FireThread"
import progress from "../../images/progress.svg"
import RecentTagRow from "./RecentTagRow"

export default function RecentTagsCard() {

    const [tags, setTags] = useState<string[] | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    async function readTags() {
        const tags = await FireThread.readRecentTags()
        setTags(tags)
        setIsLoaded(true)
    }

    useEffect(() => {
        readTags()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="bg-zinc-100 dark:bg-zinc-900 w-full min-h-96 rounded-xl p-3">
            <p className="font-bold text-lg">最近</p>

            {!isLoaded &&
                <div className='flex justify-center p-3'>
                    <img src={progress} alt='loading' />
                </div>
            }

            {isLoaded && tags === null &&
                <div className="p-3">
                    <p className="text-gray-500 text-center">読み取りに失敗しました。</p>
                </div>
            }

            {isLoaded && tags !== null && tags.length === 0 &&
                <div className="pt-1">
                    <p className="text-gray-500">結果なし</p>
                </div>
            }

            {isLoaded && tags !== null &&
                <div>
                    {tags.map((tag) => (
                        <RecentTagRow tag={tag} key={tag}/>
                    ))}
                </div>
            }
        </div>
    )
}