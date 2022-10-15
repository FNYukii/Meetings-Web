import { useState } from 'react'
import HomeMenu from '../parts/menus/HomeMenu'
import ThreadsRecentlyCommentedList from '../parts/lists/ThreadsRecentlyCommentedList'
import ThreadsRecentlyCreatedList from '../parts/lists/ThreadsRecentlyCreatedList'

export default function HomeScreen() {

    document.title = 'Meetings'

    const [selection, setSelection] = useState(1)
    
    return (
        <div>
            <div className='sticky top-0 z-20'>
                <div className='relative h-14 pl-3 pr-1 flex items-center justify-between bg-white/70 dark:bg-black/70 backdrop-blur'>

                    <div className='absolute top-0 left-0 w-full h-full cursor-pointer' onClick={() => window.scrollTo(0, 0)}></div>

                    <span className='font-bold text-lg'>ホーム</span>

                    <HomeMenu setSelection={setSelection} selection={selection}/>
                </div>
            </div>

            {selection === 0 &&
                <ThreadsRecentlyCreatedList />
            }

            {selection === 1 &&
                <ThreadsRecentlyCommentedList />
            }
        </div >
    )
}