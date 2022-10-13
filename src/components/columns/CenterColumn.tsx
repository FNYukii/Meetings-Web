import { Routes, Route, useLocation } from 'react-router-dom'

import HomeScreen from '../screens/HomeScreen'
import ThreadScreen from '../screens/ThreadScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import SearchScreen from '../screens/SearchScreen'
import CommentScreen from '../screens/CommentScreen'
import UserScreen from '../screens/UserScreen'
import ImageModal from '../modals/ImageModal'
import ReportModal from '../modals/ReportModal'
import EmptyModal from '../modals/EmptyModal'

export default function CenterColumn() {

    // 現在アドレスバーに入力されているURL
    const location = useLocation()
    const currentPath = location.pathname

    // ひとつ前のページのURL or ホームのURL
    const state = location.state as { previousPath?: string }
    const previousPath: string | undefined = state?.previousPath ?? "/"

    // Modalの表示のboolean
    const isShowImageModal = currentPath.match(/^\/comments\/\w{20}\/images\/\d{1}$/)
    const isShowReportModal = currentPath.match(/^\/report\/(threads|comments|users)\/\w{20,}$/)
    const isShowModal = isShowImageModal || isShowReportModal ? true : false

    return (
        <div className='xl:w-2/4 md:w-7/12 w-full min-h-screen border-l border-r border-zinc-200 dark:border-zinc-800'>

            <Routes location={isShowModal ? previousPath : currentPath}>

                <Route path='/' element={<HomeScreen />} />
                <Route path='/search' element={<SearchScreen />} />
                <Route path='/threads/:threadId' element={<ThreadScreen />} />
                <Route path='/comments/:commentId' element={<CommentScreen />} />
                <Route path='/users/:userId' element={<UserScreen />} />
                <Route path='*' element={<NotFoundScreen />} />
            </Routes>

            <Routes location={isShowModal ? undefined : ""}>

                <Route path='/report/:collectionName/:documentId' element={<ReportModal />} />
                <Route path='/comments/:commentId/images/:imageNumber' element={<ImageModal />} />
                <Route path='*' element={<EmptyModal/>}/>
            </Routes>
        </div>
    )
}