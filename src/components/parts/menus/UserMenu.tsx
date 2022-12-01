import { MenuItem } from "@szhsin/react-menu"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { AiOutlineEdit, AiOutlineLogout } from "react-icons/ai"
import { FiFlag } from "react-icons/fi"
import { Link, useLocation } from "react-router-dom"
import User from "../../../entities/User"
import FireAuth from "../../../utilities/FireAuth"
import PopupMenu from "./PopupMenu"

function UserMenu(props: { user: User }) {

    const location = useLocation()
    const [uid, setUid] = useState<string | null>(null)

    useEffect(() => {

        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid)
            } else {
                setUid(null)
            }
        })
    }, [])

    return (
        <PopupMenu menuButtonClassName="text-3xl hover:bg-zinc-100 dark:hover:bg-zinc-900">
            <div>
                {uid !== props.user.id &&

                    <MenuItem>

                        <Link to={`/report/users/${props.user.id}`} state={{ previousPath: location.pathname }} className="flex items-center gap-3">
                            <FiFlag className='text-gray-500 text-xl' />
                            <span>ユーザーを報告</span>
                        </Link>
                    </MenuItem>
                }

                {uid === props.user.id &&

                    <div>
                        <MenuItem>
                            <Link to="/settings/profile" state={{ previousPath: location.pathname }} className="flex items-center gap-3">
                                <AiOutlineEdit className='text-xl text-gray-500' />
                                <span>プロフィールを編集</span>
                            </Link>
                        </MenuItem>

                        <MenuItem>
                            <button onClick={() => FireAuth.signOut()} className="flex items-center gap-3 text-red-500">
                                <AiOutlineLogout className='text-xl' />
                                <span>サインアウト</span>
                            </button>
                        </MenuItem>
                    </div>
                }
            </div>
        </PopupMenu>
    )
}

export default UserMenu