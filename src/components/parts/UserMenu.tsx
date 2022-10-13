import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { useState } from "react";
import { VscEllipsis } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";
import User from "../../entities/User";

export default function UserMenu(props: { user: User }) {

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
            <VscEllipsis className="text-3xl" />
        </MenuButton>
    )

    return (
        <div className="z-10">

            <Menu menuButton={menuButton} theming={isDark ? "dark" : undefined}>
                <MenuItem>
                    <Link to={`/report/users/${props.user.id}`} state={{ previousPath: location.pathname }}>ユーザーを報告</Link>
                </MenuItem>
            </Menu>
        </div>
    )
}