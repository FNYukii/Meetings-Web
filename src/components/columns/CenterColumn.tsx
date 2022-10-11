import { Routes, Route, useLocation } from 'react-router-dom'

import HomeScreen from '../screens/HomeScreen'
import ThreadScreen from '../screens/ThreadScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import SearchScreen from '../screens/SearchScreen'
import CommentScreen from '../screens/CommentScreen'
import UserScreen from '../screens/UserScreen'
import ImageModal from '../modals/ImageModal'

export default function CenterColumn() {

    const location = useLocation()
    const state = location.state as { previousPath?: string }
    const previousPath: string | undefined = state?.previousPath ?? "/"
    
    return (
        <div className='xl:w-2/4 md:w-7/12 w-full min-h-screen border-l border-r border-zinc-200 dark:border-zinc-800'>

            <Routes location={location.pathname.includes("/images/") ? previousPath : location.pathname}>

                <Route path='/' element={<HomeScreen />} />
                <Route path='/search' element={<SearchScreen />} />
                <Route path='/threads/:threadId' element={<ThreadScreen />} />
                <Route path='/comments/:commentId' element={<CommentScreen />} />
                <Route path='/users/:userId' element={<UserScreen />} />
                <Route path='*' element={<NotFoundScreen />} />
            </Routes>

            <Routes>
                <Route path='/images/:imageUrl' element={<ImageModal />} />
            </Routes>
        </div>
    )
}