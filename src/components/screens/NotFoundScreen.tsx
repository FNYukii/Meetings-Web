import BackButton from "../parts/BackButton"

export default function NotFoundScreen() {

    document.title = "Not Found - Meetings"

    return (
        <div>
            <div className='h-14 sticky top-0 bg-white/70 dark:bg-black/70 z-20 backdrop-blur px-3 flex items-center'>
                <BackButton/>
                <span className='font-bold text-lg'>Not Found</span>
            </div>

            <div className="p-2">
                <p className="text-gray-500 text-center">ページが見つかりませんでした。</p>
            </div>
        </div>
    )
}