import { Menu, MenuButton } from '@szhsin/react-menu'
import { VscEllipsis } from 'react-icons/vsc'
import '@szhsin/react-menu/dist/index.css'
import "@szhsin/react-menu/dist/theme-dark.css"
import { useState } from "react"

function PopupMenu(props: { children: JSX.Element, large?: boolean | undefined, bg200?: boolean | undefined, className?: string}) {

    const [isDark, setIsDark] = useState(false)

    function checkTheme() {
        const isDark = matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;

        setIsDark(isDark)
    }

    const menuButton = (
        <MenuButton className={`transition rounded-full aspect-square flex items-center p-1 ${props.bg200 ? "hover:bg-gray-200 dark:hover:bg-gray-800" : "hover:bg-gray-100 dark:hover:bg-gray-900"} ${props.className}`} onClick={checkTheme}>
            <VscEllipsis className={`pointer-events-auto ${props.large ? "text-3xl" : "text-xl text-gray-500"}`} />
        </MenuButton>
    )

    return (
        <div className="z-10">

            <Menu menuButton={menuButton} theming={isDark ? "dark" : undefined} className="pointer-events-auto">
                {props.children}
            </Menu>
        </div>
    )
}

export default PopupMenu