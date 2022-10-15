import { useEffect, useState } from "react"
import FireThreads from "../../../utilities/FireThreads"
import ProgressImage from "../images/ProgressImage"
import RecentTagRow from "../rows/RecentTagRow"

export default function RecentTagsCard() {

    const [tags, setTags] = useState<string[] | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    async function readTags() {

        // Firestoreから最近のtagsを読み取り
        const tags = await FireThreads.readRecentTags()

        // 興味なしtagsをlocalStorageから取得
        let uninterestedTags: string[] = []
        const uninterestedTagsJson = localStorage.getItem('uninterestedTagsJson')

        if (uninterestedTagsJson === null) {
            uninterestedTags = []
        } else {
            uninterestedTags = JSON.parse(uninterestedTagsJson)
        }

        // 配列tagsから興味なしtagsを削除
        let recommendedTags: string[] = []
        if (tags !== null) {
            tags.forEach((tag) => {
                if (!uninterestedTags.includes(tag)) {
                    recommendedTags.push(tag)
                }
            })
        }

        setTags(tags !== null ? recommendedTags : null)
        setIsLoaded(true)
    }

    const removeTag = (uninterestedTag: string) => {

        if (tags === null) {
            return
        }

        // 興味なしtagsを生成
        let uninterestedTags: string[] = []
        const uninterestedTagsJson = localStorage.getItem('uninterestedTagsJson')

        if (uninterestedTagsJson === null) {
            uninterestedTags = []
        } else {
            uninterestedTags = JSON.parse(uninterestedTagsJson)
        }

        // 興味なしtagsにタグを追加
        uninterestedTags.push(uninterestedTag)
        
        // 興味なしtagsをlocalStorageに追加
        localStorage.setItem('uninterestedTagsJson', JSON.stringify(uninterestedTags, undefined, 1))

        // Stateのtagsを変更
        const newTags = tags.filter(tag => tag !== uninterestedTag)
        setTags(newTags)
    }

    useEffect(() => {
        readTags()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="bg-zinc-100 dark:bg-zinc-900 w-full min-h-96 rounded-xl py-3">
            <p className="font-bold text-lg mx-3">最近</p>

            {!isLoaded &&
                <div className='flex justify-center p-3'>
                    <ProgressImage/>
                </div>
            }

            {isLoaded && tags === null &&
                <div className="p-3">
                    <p className="text-gray-500 text-center">読み取りに失敗しました。</p>
                </div>
            }

            {isLoaded && tags !== null && tags.length === 0 &&
                <div className="pt-1 px-3">
                    <p className="text-gray-500">結果なし</p>
                </div>
            }

            {isLoaded && tags !== null &&
                <div className="mt-2">
                    {tags.map((tag) => (
                        <RecentTagRow tag={tag} key={tag} removeTag={removeTag}/>
                    ))}
                </div>
            }
        </div>
    )
}