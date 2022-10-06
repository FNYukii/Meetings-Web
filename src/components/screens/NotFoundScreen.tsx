export default function NotFoundScreen() {

    document.title = "Not Found - Meetings"

    return (
        <div>
            <div className='p-2 border-b border-zinc-200 dark:border-zinc-800'>
                <span className='font-bold text-lg'>不明</span>
            </div>

            <div className="p-2">
                <p>ページが見つかりませんでした。</p>
            </div>
        </div>
    )
}