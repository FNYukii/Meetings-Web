import Thread from "../../types/Thread"
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import { VscEllipsis } from 'react-icons/vsc'
import '@szhsin/react-menu/dist/index.css'
import "@szhsin/react-menu/dist/theme-dark.css"
import { useState } from "react"

export default function ThreadMenu(props: { thread: Thread, iconClassName?: string }) {

    const [isDark, setIsDark] = useState(false)

    function checkTheme() {
        const isDark = matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;

        setIsDark(isDark)
    }

    const menuButton = (
        <MenuButton className="hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full aspect-square flex items-center p-1" onClick={checkTheme}>
            <VscEllipsis className={`text-xl text-gray-500 ${props.iconClassName}`} />
        </MenuButton>
    )

    return (
        <div className="z-10">

            <Menu menuButton={menuButton} theming={isDark ? "dark" : undefined}>
                <MenuItem>スレッドを報告</MenuItem>
            </Menu>
        </div>
    )
}