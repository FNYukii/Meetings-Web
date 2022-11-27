function CommentsByUserTabBar(props: {selection: number, setSelection: React.Dispatch<React.SetStateAction<number>>}) {

    return (
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 mt-3">

            <button onClick={() => props.setSelection(0)} className="w-1/2 transition hover:bg-zinc-100 dark:hover:bg-zinc-900 relative">

                <div className="text-center p-3">

                    <span className={props.selection === 0 ? "font-bold" : ""}>コメント</span>

                    <div className="absolute bottom-0 left-0 w-full">
                        <div className={`h-0.5 mx-3 ${props.selection === 0 ? "bg-black dark:bg-white" : ""}`}></div>
                    </div>
                </div>
            </button>

            <button onClick={() => props.setSelection(1)} className="w-1/2 transition hover:bg-zinc-100 dark:hover:bg-zinc-900 relative">

                <div className="text-center p-3">

                    <span className={props.selection === 1 ? "font-bold" : ""}>いいね</span>

                    <div className="absolute bottom-0 left-0 w-full">
                        <div className={`h-0.5 mx-3 ${props.selection === 1 ? "bg-black dark:bg-white" : ""}`}></div>
                    </div>
                </div>
            </button>
        </div>
    )
}

export default CommentsByUserTabBar