import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import { VscEllipsis } from 'react-icons/vsc'
import '@szhsin/react-menu/dist/index.css'
import "@szhsin/react-menu/dist/theme-dark.css"
import { useEffect, useState } from "react"
import Comment from "../../../entities/Comment"
import { Link, useLocation } from 'react-router-dom'
import { FiFlag, FiTrash } from 'react-icons/fi'
import { auth } from '../../../utilities/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import FireComments from '../../../utilities/FireComments'

export default function CommentMenu(props: { comment: Comment, iconClassName?: string }) {

    const location = useLocation()
    const [isDark, setIsDark] = useState(false)
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

    function checkTheme() {
        const isDark = matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;

        setIsDark(isDark)
    }

    const menuButton = (
        <MenuButton className="hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full aspect-square flex items-center p-1" onClick={checkTheme}>
            <VscEllipsis className={`${props.iconClassName} pointer-events-auto`} />
        </MenuButton>
    )

    return (
        <div className="z-10">

            <Menu menuButton={menuButton} theming={isDark ? "dark" : undefined} className="pointer-events-auto">

                {uid === props.comment.userId &&

                    <MenuItem>
                        <button onClick={() => FireComments.deleteComment(uid)} className="flex items-center gap-3 text-red-500">
                            <FiTrash className='text-xl'/>
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
            </Menu>
        </div>
    )
}