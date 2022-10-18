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
import SignInModal from '../modals/SignInModal'
import AddCommentModal from '../modals/AddCommentModal'
import AddThreadModal from '../modals/AddThreadModal'
import EditUserModal from '../modals/EditUserModal'

export default function CenterColumn(props: {className?: string}) {

    // 現在アドレスバーに入力されているURL
    const location = useLocation()
    const keyword = (new URLSearchParams(location.search)).get("keyword")
    const currentPath = location.pathname
    const currentUrl = keyword === null ? currentPath : `${currentPath}?keyword=${keyword}`

    // ひとつ前のページのURL or ホームのURL
    const state = location.state as { previousPath?: string }
    const previousPath: string | undefined = state?.previousPath ?? "/"
    
    // Modalの表示のboolean
    const isShowImageModal = currentPath.match(/^\/comments\/\w{20}\/images\/\d{1}$/)
    const isShowReportModal = currentPath.match(/^\/report\/(threads|comments|users)\/\w{20,}$/)
    const isShowSignInModal = currentPath === "/sign-in"
    const isShowAddCommentModal = currentPath.match(/^\/threads\/\w{20}\/new$/)
    const isShowAddThreadModal = currentPath === "/new"
    const isShowEditUserModal = currentPath === "/settings/profile"

    const isShowModal = isShowImageModal || isShowReportModal || isShowSignInModal || isShowAddCommentModal || isShowAddThreadModal || isShowEditUserModal ? true : false

    return (
        <div className={`min-h-screen border-l border-r border-zinc-200 dark:border-zinc-800 ${props.className}`}>

            <Routes location={isShowModal ? previousPath : currentUrl}>

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
                <Route path='/sign-in' element={<SignInModal />} />
                <Route path='/new' element={<AddThreadModal />} />
                <Route path='/threads/:threadId/new' element={<AddCommentModal />} />
                <Route path='/settings/profile' element={<EditUserModal />} />

                <Route path='*' element={<EmptyModal/>}/>
            </Routes>
        </div>
    )
}