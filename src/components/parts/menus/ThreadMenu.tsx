import Thread from "../../../entities/Thread"
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import { VscEllipsis } from 'react-icons/vsc'
import '@szhsin/react-menu/dist/index.css'
import "@szhsin/react-menu/dist/theme-dark.css"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { FiFlag, FiTrash } from "react-icons/fi"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import FireThreads from "../../../utilities/FireThreads"

export default function ThreadMenu(props: { thread: Thread }) {

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
            <VscEllipsis className={`text-xl text-gray-500 pointer-events-auto`} />
        </MenuButton>
    )

    return (
        <div className="z-10">

            <Menu menuButton={menuButton} theming={isDark ? "dark" : undefined} className="pointer-events-auto">

                {uid !== props.thread.userId &&

                    <MenuItem>

                        <Link to={`/report/threads/${props.thread.id}`} state={{ previousPath: location.pathname }} className="flex items-center gap-3">

                            <FiFlag className='text-gray-500' />
                            <span>スレッドを報告</span>
                        </Link>
                    </MenuItem>
                }

                {uid === props.thread.userId &&

                    <MenuItem>

                        <button onClick={() => FireThreads.deleteThread(uid)} className="flex items-center gap-3 text-red-500">

                            <FiTrash />
                            <span>スレッドを削除</span>
                        </button>
                    </MenuItem>
                }
            </Menu>
        </div>
    )
}