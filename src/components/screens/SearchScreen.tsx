import { useState } from "react"
import { useLocation } from "react-router-dom";
import RecentImagesScreen from "./RecentImagesScreen"
import SearchResultScreen from "./SearchResultScreen";

export default function SearchScreen() {

    document.title = "検索 - Meetings"

    const [keyword, setKeyword] = useState("")

    const searchedKeyword = (new URLSearchParams(useLocation().search)).get("keyword")

    return (
        <div>
            <div className='sticky top-0 z-20'>
                <div className='relative h-14 px-3 flex items-center bg-white/70 dark:bg-black/70 backdrop-blur'>

                    <div className='absolute top-0 left-0 w-full h-full cursor-pointer' onClick={() => window.scrollTo(0, 0)}></div>

                    <form onSubmit={() => console.log("hello")} className="w-full z-10">
                        <input type="search" name="keyword" onChange={(e) => setKeyword(e.target.value)} onSubmit={() => console.log("helo")} className="bg-zinc-100 dark:bg-zinc-900 py-2 px-4 rounded-full w-full" placeholder="キーワード" />
                    </form>
                </div>
            </div>

            {searchedKeyword === null &&
                <RecentImagesScreen />
            }

            {searchedKeyword !== null &&
                <SearchResultScreen keyword={`${searchedKeyword}`}/>
            }
        </div>
    )
}