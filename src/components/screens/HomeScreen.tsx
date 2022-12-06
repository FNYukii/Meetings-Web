import { useEffect } from 'react'
import NewThreadLink from '../parts/links/NewThreadLink'
import ThreadsList from '../parts/lists/ThreadsList'
import TitleBar from '../parts/sections/TitleBar'

function HomeScreen() {

    useEffect(() => {

        document.title = 'Meetings'
    }, [])

    return (
        <div>
            <TitleBar>
                <div className='flex items-center justify-between w-full'>
                    <span className='font-bold text-lg'>ホーム</span>

                    <NewThreadLink />
                </div>
            </TitleBar>

            <ThreadsList />
        </div >
    )
}

export default HomeScreen