import { useState } from "react"
import RecentImagesScreen from "./RecentImagesScreen"

export default function SearchScreen() {

    document.title = "検索 - Meetings"

    const [keyword, setKeyword] = useState("")

    return (
        <div>
            <div className='sticky top-0 z-20'>
                <div className='relative h-14 px-3 flex items-center bg-white/70 dark:bg-black/70 backdrop-blur'>

                    <div className='absolute top-0 left-0 w-full h-full cursor-pointer' onClick={() => window.scrollTo(0, 0)}></div>
                    
                    <input type="search" onChange={(e) => setKeyword(e.target.value)} className="bg-zinc-100 dark:bg-zinc-900 py-2 px-4 rounded-full w-full z-10" placeholder="キーワード"/>
                </div>
            </div>

            <RecentImagesScreen/>
        </div>
    )
}