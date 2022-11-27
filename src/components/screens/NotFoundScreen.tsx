import BackButton from "../parts/buttons/BackButton"

function NotFoundScreen() {

    document.title = "Not Found - Meetings"

    return (
        <div>
            <div className='sticky top-0 z-20'>
                <div className='relative h-14 px-3 flex items-center bg-white/70 dark:bg-black/70 backdrop-blur'>

                    <div className='absolute top-0 left-0 w-full h-full cursor-pointer' onClick={() => window.scrollTo(0, 0)}></div>

                    <BackButton/>
                    
                    <span className='font-bold text-lg'>Not Found</span>
                </div>
            </div>

            <div className="p-2">
                <p className="text-gray-500 text-center">ページが見つかりませんでした。</p>
            </div>
        </div>
    )
}

export default NotFoundScreen