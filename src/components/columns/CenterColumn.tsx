import { Routes, Route, useLocation, useRoutes } from 'react-router-dom'

import HomeScreen from '../screens/HomeScreen'
import ThreadScreen from '../screens/ThreadScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import SearchScreen from '../screens/SearchScreen'
import CommentScreen from '../screens/CommentScreen'
import UserScreen from '../screens/UserScreen'
import ImageModal from '../modals/ImageModal'

export default function CenterColumn() {

    const location = useLocation()
    const state = location.state as { backgroundPath?: string }
    const background = state?.backgroundPath ?? '/'

    const modalElement = useRoutes([
        {
            path: '/images/:imageUrl',
            element: <ImageModal />
        }
    ])

    console.log(`modalElement ${modalElement}`)
    console.log(`background ${background}`)


    return (
        <div className='xl:w-2/4 md:w-7/12 w-full min-h-screen border-l border-r border-zinc-200 dark:border-zinc-800'>

            <Routes location={modalElement !== null ? background : undefined}>

                <Route path='/' element={<HomeScreen />} />
                <Route path='/search' element={<SearchScreen />} />
                <Route path='/threads/:threadId' element={<ThreadScreen />} />
                <Route path='/comments/:commentId' element={<CommentScreen />} />
                <Route path='/users/:userId' element={<UserScreen />} />
                <Route path='*' element={<NotFoundScreen />} />
            </Routes>

            {modalElement !== null &&
                <ImageModal/>
            }
        </div>
    )
}