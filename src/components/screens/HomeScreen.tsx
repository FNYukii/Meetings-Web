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
            <TitleBar justifyBetween>
                <span className='ml-3 font-bold text-lg'>ホーム</span>

                <NewThreadLink className='mr-1' />
            </TitleBar>

            <ThreadsList />
        </div >
    )
}

export default HomeScreen