import { MenuItem } from '@szhsin/react-menu'
import { useEffect, useState } from "react"
import Comment from "../../../entities/Comment"
import { Link, useLocation } from 'react-router-dom'
import { FiFlag, FiTrash } from 'react-icons/fi'
import { auth } from '../../../utilities/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import FireComments from '../../../utilities/FireComments'
import PopupMenu from './PopupMenu'

function CommentMenu(props: { comment: Comment, setIsHidden?: React.Dispatch<React.SetStateAction<boolean>>, className?: string, large?: boolean | undefined }) {

    const location = useLocation()
    const [uid, setUid] = useState<string | null>(null)

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid)
            } else {
                setUid(null)
            }
        })
    }, [])

    async function deleteComment() {

        // コメントを削除
        const commentId = await FireComments.deleteComment(props.comment.id)

        // 失敗
        if (!commentId || !props.setIsHidden) {
            return
        }

        props.setIsHidden(true)
    }

    return (
        <PopupMenu large={props.large} className={props.className}>
            <div>
                {uid === props.comment.userId &&

                    <MenuItem>
                        <button onClick={deleteComment} className="flex items-center gap-3 text-red-500">
                            <FiTrash className='text-xl' />
                            <span>コメントを削除</span>
                        </button>
                    </MenuItem>
                }

                {uid !== props.comment.userId &&

                    <MenuItem>
                        <Link to={`/report/comments/${props.comment.id}`} state={{ previousPath: location.pathname }} className="flex items-center gap-3">
                            <FiFlag className='text-gray-500 text-xl' />
                            <span>コメントを報告</span>
                        </Link>
                    </MenuItem>
                }
            </div>
        </PopupMenu>
    )
}

export default CommentMenu