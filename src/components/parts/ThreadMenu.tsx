import Thread from "../../types/Thread"
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import { VscEllipsis } from 'react-icons/vsc'
import '@szhsin/react-menu/dist/index.css'
import "@szhsin/react-menu/dist/theme-dark.css"

export default function ThreadMenu(props: { thread: Thread }) {

    const menuButton = (
        <MenuButton className="hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full aspect-square flex items-center p-1">
            <VscEllipsis className="text-xl text-gray-500" />
        </MenuButton>
    )

    return (
        <div className="z-10">

            <Menu menuButton={menuButton} theming="dark">
                <MenuItem>スレッドを削除</MenuItem>
            </Menu>
        </div>
    )
}