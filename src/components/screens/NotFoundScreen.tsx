export default function NotFoundScreen() {

    document.title = "Not Found - Meetings"

    return (
        <div>
            <div className='p-2 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 bg-white dark:bg-black'>
                <span className='font-bold text-lg'>Not Found</span>
            </div>

            <div className="p-2">
                <p className="text-gray-500 text-center">ページが見つかりませんでした。</p>
            </div>
        </div>
    )
}