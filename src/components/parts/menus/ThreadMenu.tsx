import Thread from "../../../entities/Thread"
import { MenuItem } from '@szhsin/react-menu'
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { FiFlag, FiTrash } from "react-icons/fi"
import { onAuthStateChanged } from "firebase/auth"
import FireThreads from "../../../utilities/FireThreads"
import { auth } from "../../../utilities/firebase"
import PopupMenu from "./PopupMenu"

function ThreadMenu(props: { thread: Thread }) {

    const location = useLocation()
    const [uid, setUid] = useState<string | null>(null)

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid)
            } else {
                setUid(null)
            }
        })
    }, [])

    return (
        <PopupMenu menuButtonClassName='text-xl hover:bg-zinc-100 dark:hover:bg-zinc-900'>
            <div>
                {uid !== props.thread.userId &&

                    <MenuItem>
                        <Link to={`/report/threads/${props.thread.id}`} state={{ previousPath: location.pathname }} className="flex items-center gap-3">
                            <FiFlag className='text-gray-500 text-xl' />
                            <span>スレッドを報告</span>
                        </Link>
                    </MenuItem>
                }

                {uid === props.thread.userId &&

                    <MenuItem>
                        <button onClick={() => FireThreads.deleteThread(props.thread.id)} className="flex items-center gap-3 text-red-500">
                            <FiTrash className="text-xl" />
                            <span>スレッドを削除</span>
                        </button>
                    </MenuItem>
                }
            </div>
        </PopupMenu>
    )
}

export default ThreadMenu