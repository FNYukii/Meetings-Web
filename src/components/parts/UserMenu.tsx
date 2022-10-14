import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { VscEllipsis } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";
import User from "../../entities/User";
import FireAuth from "../../utilities/FireAuth";

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
                    <div>
                        <MenuItem>
                            <Link to={`/report/users/${props.user.id}`} state={{ previousPath: location.pathname }}>ユーザーを報告</Link>
                        </MenuItem>
                    </div>
                }

                {uid !== null &&
                    <div>
                        <MenuItem>
                            <button onClick={() => FireAuth.signOut()}>サインアウト</button>
                        </MenuItem>
                    </div>
                }
            </Menu>
        </div>
    )
}