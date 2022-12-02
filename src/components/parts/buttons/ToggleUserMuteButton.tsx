import { useEffect, useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import User from "../../../entities/User"
import FireUsers from "../../../utilities/FireUsers"
import ProgressImage from "../images/ProgressImage"

function ToggleUserMuteButton(props: { user: User }) {

    const [mutedUserIds, setMutedUserIds] = useState<string[] | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    async function readMutedUserIds() {

        const users = await FireUsers.readMutedUserIds()
        setMutedUserIds(users)
        setIsLoaded(true)
    }

    useEffect(() => {

        readMutedUserIds()
        // eslint-disable-next-line
    }, [])

    return (
        <div>

            {!isLoaded &&
                <ProgressImage className="w-6"/>
            }

            {isLoaded && mutedUserIds && !mutedUserIds.includes(props.user.id) &&

                <button onClick={() => FireUsers.muteUser(props.user.id)} className="flex items-center gap-3">

                    <AiOutlineEyeInvisible className='text-gray-500 text-xl' />

                    <span>@{props.user.userTag}さんをミュート</span>
                </button>
            }

            {isLoaded && mutedUserIds && mutedUserIds.includes(props.user.id) &&
            
                <button onClick={() => FireUsers.unmuteUser(props.user.id)} className="flex items-center gap-3">

                    <AiOutlineEye className='text-gray-500 text-xl' />
                    
                    <span>@{props.user.userTag}さんのミュートを解除</span>
                </button>
            }
        </div>
    )
}

export default ToggleUserMuteButton