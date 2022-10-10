import { useState } from "react"
import SearchCommentsScreen from "./SearchCommentsScreen"
import SearchThreadsScreen from "./SearchThreadsScreen"
import SearchUsersScreen from "./SearchUsersScreen"

export default function SearchResultsScreen(props: { keyword: string }) {

    const [tab, setTab] = useState(0)

    return (
        <div>

            <div className="mt-3 flex border-b border-zinc-200 dark:border-zinc-800">

                <button onClick={() => setTab(0)} className="w-1/3 hover:bg-zinc-100 dark:hover:bg-zinc-900 relative">

                    <div className="text-center p-3">

                        <span className={tab === 0 ? "font-bold" : ""}>スレッド</span>

                        <div className="absolute bottom-0 left-0 w-full">
                            <div className={`h-0.5 mx-3 ${tab === 0 ? "bg-black dark:bg-white" : ""}`}></div>
                        </div>
                    </div>
                </button>

                <button onClick={() => setTab(1)} className="w-1/3 hover:bg-zinc-100 dark:hover:bg-zinc-900 relative">

                    <div className="text-center p-3">

                        <span className={tab === 1 ? "font-bold" : ""}>コメント</span>

                        <div className="absolute bottom-0 left-0 w-full">
                            <div className={`h-0.5 mx-3 ${tab === 1 ? "bg-black dark:bg-white" : ""}`}></div>
                        </div>
                    </div>
                </button>

                <button onClick={() => setTab(2)} className="w-1/3 hover:bg-zinc-100 dark:hover:bg-zinc-900 relative">

                    <div className="text-center p-3">

                        <span className={tab === 2 ? "font-bold" : ""}>ユーザー</span>

                        <div className="absolute bottom-0 left-0 w-full">
                            <div className={`h-0.5 mx-3 ${tab === 2 ? "bg-black dark:bg-white" : ""}`}></div>
                        </div>
                    </div>
                </button>
            </div>

            <SearchThreadsScreen keyword={props.keyword} className={tab === 0 ? "" : "hidden"}/>
            <SearchCommentsScreen keyword={props.keyword} className={tab === 1 ? "" : "hidden"}/>
            <SearchUsersScreen keyword={props.keyword} className={tab === 2 ? "" : "hidden"}/>
        </div>
    )
}