import { Routes, Route, useLocation } from 'react-router-dom'

import HomeScreen from '../screens/HomeScreen'
import ThreadScreen from '../screens/ThreadScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import SearchScreen from '../screens/SearchScreen'
import CommentScreen from '../screens/CommentScreen'
import UserScreen from '../screens/UserScreen'
import ImageModal from '../modals/ImageModal'
import ReportModal from '../modals/ReportModal'

export default function CenterColumn() {

    const location = useLocation()
    const state = location.state as { previousPath?: string }

    // 現在アドレスバーに入力されているURL
    const currentPath = location.pathname

    // ひとつ前のページのURL or ホームのURL
    const previousPath: string | undefined = state?.previousPath ?? "/"

    const isShowImageModal = currentPath.match(/^\/comments\/\w{20}\/images\/\d{1}$/)
    const isShowReportModal = currentPath.match(/^\/report\/(threads|comments|users)\/\w{20}$/)

    return (
        <div className='xl:w-2/4 md:w-7/12 w-full min-h-screen border-l border-r border-zinc-200 dark:border-zinc-800'>

            <Routes location={isShowImageModal || isShowReportModal ? previousPath : currentPath}>

                <Route path='/' element={<HomeScreen />} />
                <Route path='/search' element={<SearchScreen />} />
                <Route path='/threads/:threadId' element={<ThreadScreen />} />
                <Route path='/comments/:commentId' element={<CommentScreen />} />
                <Route path='/users/:userId' element={<UserScreen />} />
                <Route path='*' element={<NotFoundScreen />} />
            </Routes>

            <Routes>

                {isShowImageModal &&
                    <Route path='/comments/:commentId/images/:imageNumber' element={<ImageModal />} />
                }

                {isShowReportModal &&
                    <Route path='/report/:collectionName/:documentId' element={<ReportModal />} />
                }
            </Routes>
        </div>
    )
}