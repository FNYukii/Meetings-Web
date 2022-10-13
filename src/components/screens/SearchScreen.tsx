import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import BackButton from "../parts/BackButton";
import RecentImagesList from "../parts/RecentImagesList"
import SearchResultsScreen from "./SearchResultsScreen";

export default function SearchScreen() {

    document.title = "検索 - Meetings"

    const [keyword, setKeyword] = useState("")

    const searchedKeyword = (new URLSearchParams(useLocation().search)).get("keyword")

    const navigate = useNavigate()

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        // フォーム送信を無効
        e.preventDefault()

        // 検索結果画面へルーティング
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
                        <BackButton className="" />
                    }

                    <div className='absolute top-0 left-0 w-full h-full cursor-pointer' onClick={() => window.scrollTo(0, 0)}></div>

                    <form className="z-10 w-full ml-3" onSubmit={(e) => onSubmit(e)}>
                        <input type="search" name="keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="キーワード" autoComplete="off" className="w-full py-2 px-4 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                    </form>
                </div>
            </div>

            <RecentImagesList className={searchedKeyword === null ? "" : "hidden"} />

            {searchedKeyword !== null &&
                <SearchResultsScreen keyword={`${searchedKeyword}`} />
            }
        </div>
    )
}