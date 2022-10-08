import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import { VscEllipsis } from 'react-icons/vsc'
import '@szhsin/react-menu/dist/index.css'
import "@szhsin/react-menu/dist/theme-dark.css"
import { useState } from "react"
import Comment from "../../types/Comment"

export default function CommentMenu(props: { comment: Comment }) {

    const [isDark, setIsDark] = useState(false)

    function checkTheme() {
        const isDark = matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;

        setIsDark(isDark)
    }

    const menuButton = (
        <MenuButton className="hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full aspect-square flex items-center p-1" onClick={checkTheme}>
            <VscEllipsis className="text-xl text-gray-500" />
        </MenuButton>
    )

    return (
        <div className="z-10">

            <Menu menuButton={menuButton} theming={isDark ? "dark" : undefined}>
                <MenuItem>コメントを報告</MenuItem>
            </Menu>
        </div>
    )
}