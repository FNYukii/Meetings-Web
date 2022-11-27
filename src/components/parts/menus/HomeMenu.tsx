import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import { VscEllipsis } from 'react-icons/vsc'
import '@szhsin/react-menu/dist/index.css'
import "@szhsin/react-menu/dist/theme-dark.css"
import { useState } from "react"
import { AiOutlineCheck } from 'react-icons/ai'

function HomeMenu(props: { selection: number, setSelection: React.Dispatch<React.SetStateAction<number>>, className?: string }) {

    const [isDark, setIsDark] = useState(false)

    function checkTheme() {
        const isDark = matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;

        setIsDark(isDark)
    }

    const menuButton = (
        <MenuButton className="hover:bg-zinc-300/30 dark:hover:bg-zinc-700/50 rounded-full aspect-square flex items-center p-1" onClick={checkTheme}>
            <VscEllipsis className="text-3xl" />
        </MenuButton>
    )

    return (
        <div className={`z-10 ${props.className}`}>

            <Menu menuButton={menuButton} theming={isDark ? "dark" : undefined}>

                <MenuItem onClick={() => props.setSelection(0)}>

                    <AiOutlineCheck className={props.selection === 0 ? "" : "text-transparent"}/>
                    <span className='ml-2'>作成された日時順</span>
                </MenuItem>

                <MenuItem onClick={() => props.setSelection(1)}>

                    <AiOutlineCheck className={props.selection === 1 ? "" : "text-transparent"}/>
                    <span className='ml-2'>コメントされた日時順</span>
                </MenuItem>
            </Menu>
        </div>
    )
}

export default HomeMenu