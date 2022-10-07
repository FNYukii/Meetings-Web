export default function SearchScreen() {

    document.title = "検索 - Meetings"

    return (
        <div>
            <div className='h-14 sticky top-0 bg-white/70 dark:bg-black/70 z-20 backdrop-blur px-3 flex items-center'>
                <input type="text" className="bg-zinc-100 dark:bg-zinc-900 outline-blue-500 py-2 px-4 rounded-full w-full" placeholder="キーワード"/>
            </div>
        </div>
    )
}