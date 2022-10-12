import Thread from "../../types/Thread"
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import { VscEllipsis } from 'react-icons/vsc'
import '@szhsin/react-menu/dist/index.css'
import "@szhsin/react-menu/dist/theme-dark.css"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

export default function ThreadMenu(props: { thread: Thread}) {

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
            <VscEllipsis className={`text-xl text-gray-500 pointer-events-auto`} />
        </MenuButton>
    )

    return (
        <div className="z-10">

            <Menu menuButton={menuButton} theming={isDark ? "dark" : undefined} className="pointer-events-auto">
                <MenuItem>
                    <Link to={`/report/threads/${props.thread.id}`} state={{ previousPath: location.pathname }}>スレッドを報告</Link>
                </MenuItem>
            </Menu>
        </div>
    )
}