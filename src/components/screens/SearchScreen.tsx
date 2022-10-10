import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import BackButton from "../parts/BackButton";
import RecentImagesScreen from "./RecentImagesScreen"
import SearchedScreen from "./SearchedScreen";

export default function SearchScreen() {

    document.title = "検索 - Meetings"

    const [keyword, setKeyword] = useState("")

    const searchedKeyword = (new URLSearchParams(useLocation().search)).get("keyword")

    const navigate = useNavigate()

    function onSearchBarKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {

        if (e.code !== "Enter") {
            return
        }

        if (keyword === "") {
            navigate("/search")
        } else {
            navigate(`/search?keyword=${keyword}`)
        }
    }

    useEffect(() => {
        setKeyword(searchedKeyword ?? "")
    }, [searchedKeyword])

    return (
        <div>
            <div className='sticky top-0 z-20'>
                <div className='relative h-14 pl-1 pr-3 flex items-center bg-white/70 dark:bg-black/70 backdrop-blur'>

                    {searchedKeyword !== null &&
                        <BackButton className=""/>
                    }

                    <div className='absolute top-0 left-0 w-full h-full cursor-pointer' onClick={() => window.scrollTo(0, 0)}></div>

                    <input type="search" name="keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={(e) => onSearchBarKeyDown(e)} placeholder="キーワード" className="z-10 w-full bg-zinc-100 dark:bg-zinc-800 ml-2 py-2 px-4 rounded-full"/>
                </div>
            </div>

            <RecentImagesScreen className={searchedKeyword === null ? "" : "hidden"} />

            {searchedKeyword !== null &&
                <SearchedScreen keyword={`${searchedKeyword}`} />
            }
        </div>
    )
}