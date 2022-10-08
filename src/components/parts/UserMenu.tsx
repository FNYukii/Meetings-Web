import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { useState } from "react";
import { VscEllipsis } from "react-icons/vsc";
import User from "../../types/User";

export default function UserMenu(props: {user: User}) {

    const [isDark, setIsDark] = useState(false)

    function checkTheme() {
        const isDark = matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;

        setIsDark(isDark)
    }

    const menuButton = (
        <MenuButton className="hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full aspect-square flex items-center p-1" onClick={checkTheme}>
            <VscEllipsis className="text-3xl" />
        </MenuButton>
    )

    return (
        <div className="z-10">

            <Menu menuButton={menuButton} theming={isDark ? "dark" : undefined}>
                <MenuItem>ユーザーを報告</MenuItem>
            </Menu>
        </div>
    )
}