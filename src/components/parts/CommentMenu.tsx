import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import { VscEllipsis } from 'react-icons/vsc'
import '@szhsin/react-menu/dist/index.css'
import "@szhsin/react-menu/dist/theme-dark.css"
import { useState } from "react"
import Comment from "../../entities/Comment"
import { Link, useLocation } from 'react-router-dom'
import { FiFlag } from 'react-icons/fi'

export default function CommentMenu(props: { comment: Comment, iconClassName?: string }) {

    const location = useLocation()

    const [isDark, setIsDark] = useState(false)

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
                <MenuItem>
                    <Link to={`/report/comments/${props.comment.id}`} state={{ previousPath: location.pathname }} className="flex items-center gap-3">
                        <FiFlag className='text-gray-500'/>
                        <span>コメントを報告</span>
                    </Link>
                </MenuItem>
            </Menu>
        </div>
    )
}