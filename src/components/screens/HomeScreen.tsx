import HomeMenu from '../parts/HomeMenu'
import ThreadsRecentlyCommentedList from '../parts/ThreadsRecentlyCommentedList'

export default function HomeScreen() {

    document.title = 'Meetings'

    return (
        <div>
            <div className='sticky top-0 z-20'>
                <div className='relative h-14 pl-3 pr-1 flex items-center justify-between bg-white/70 dark:bg-black/70 backdrop-blur'>

                    <div className='absolute top-0 left-0 w-full h-full cursor-pointer' onClick={() => window.scrollTo(0, 0)}></div>

                    <span className='font-bold text-lg'>ホーム</span>

                    <HomeMenu />
                </div>
            </div>

            <ThreadsRecentlyCommentedList />
        </div >
    )
}