import { doc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import User from "../../../entities/User"
import FireAuth from "../../../utilities/FireAuth"
import { db } from "../../../utilities/firebase"
import FireUsers from "../../../utilities/FireUsers"
import ProgressImage from "../images/ProgressImage"

function ToggleUserMuteButton(props: { user: User }) {

    const [user, setUser] = useState<User | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    async function readUser() {

        const uid = FireAuth.uid()
        if (!uid) return

        onSnapshot(doc(db, "users", uid), (doc) => {

            const user = FireUsers.toUserFromDocumentSnapshot(doc)
            setUser(user)
            setIsLoaded(true)
        }, (error) => {

            console.log(`User reading failed. ${error}`)
            setIsLoaded(true)
        })
    }

    useEffect(() => {

        readUser()
        // eslint-disable-next-line
    }, [])

    return (
        <div>

            {!isLoaded &&
                <ProgressImage className="w-6"/>
            }

            {isLoaded && user && !user.mutedUserIds.includes(props.user.id) &&

                <button onClick={() => FireUsers.muteUser(props.user.id)} className="flex items-center gap-3">

                    <AiOutlineEyeInvisible className='text-gray-500 text-xl' />

                    <span>@{props.user.userTag}さんをミュート</span>
                </button>
            }

            {isLoaded && user && user.mutedUserIds.includes(props.user.id) &&
            
                <button onClick={() => FireUsers.unmuteUser(props.user.id)} className="flex items-center gap-3">

                    <AiOutlineEye className='text-gray-500 text-xl' />
                    
                    <span>@{props.user.userTag}さんのミュートを解除</span>
                </button>
            }
        </div>
    )
}

export default ToggleUserMuteButton