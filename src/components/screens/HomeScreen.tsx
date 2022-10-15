import { useEffect } from 'react'
import ThreadsRecentlyCommentedList from '../parts/lists/ThreadsRecentlyCommentedList'
import { Link } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'

export default function HomeScreen() {

    useEffect(() => {
        
        document.title = 'Meetings'
    }, [])
    
    return (
        <div>
            <div className='sticky top-0 z-20'>
                <div className='relative h-14 pl-3 pr-1 flex items-center justify-between bg-white/70 dark:bg-black/70 backdrop-blur'>

                    <div className='absolute top-0 left-0 w-full h-full cursor-pointer' onClick={() => window.scrollTo(0, 0)}></div>

                    <span className='font-bold text-lg'>ホーム</span>

                    <Link to={`/new`} className="z-10 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900">
                        <AiOutlinePlus className="text-2xl" />
                    </Link>
                </div>
            </div>

            <ThreadsRecentlyCommentedList />
        </div >
    )
}