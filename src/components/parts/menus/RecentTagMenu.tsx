import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import { VscEllipsis } from 'react-icons/vsc'
import '@szhsin/react-menu/dist/index.css'
import "@szhsin/react-menu/dist/theme-dark.css"
import { useState } from "react"

export default function RecentTagMenu(props: { tag: string, removeTag: (tag: string) => void }) {

    const [isDark, setIsDark] = useState(false)

    function checkTheme() {
        const isDark = matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;

        setIsDark(isDark)
    }

    const menuButton = (
        <MenuButton className="hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full aspect-square flex items-center p-1" onClick={checkTheme}>
            <VscEllipsis className="z-10 text-xl text-gray-500" />
        </MenuButton>
    )

    return (
        <div>
            <Menu menuButton={menuButton} theming={isDark ? "dark" : undefined}>
                <MenuItem>
                    <button onClick={() => props.removeTag(props.tag)}>興味なし</button>
                </MenuItem>
            </Menu>
        </div>
    )
}