import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { FiFlag } from "react-icons/fi";
import { VscEllipsis } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";
import User from "../../../entities/User";
import FireAuth from "../../../utilities/FireAuth";

export default function UserMenu(props: { user: User }) {

    const location = useLocation()
    const [isDark, setIsDark] = useState(false)
    const [uid, setUid] = useState<string | null>(null)

    useEffect(() => {

        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid)
            } else {
                setUid(null)
            }
        })
    }, [])

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

                {uid === null &&

                    <MenuItem>

                        <Link to={`/report/users/${props.user.id}`} state={{ previousPath: location.pathname }} className="flex items-center gap-3">

                            <FiFlag className='text-gray-500' />
                            <span>ユーザーを報告</span>
                        </Link>
                    </MenuItem>
                }

                {uid !== null &&

                    <MenuItem>
                        <button onClick={() => FireAuth.signOut()} className="text-red-500">サインアウト</button>
                    </MenuItem>
                }
            </Menu>
        </div>
    )
}