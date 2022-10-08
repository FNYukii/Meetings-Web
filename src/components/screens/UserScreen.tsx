import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import User from "../../types/User"
import FireUser from "../../utilities/FireUser"
import BackButton from "../parts/BackButton"
import progress from "../../images/progress.svg"
import UserIcon from "../parts/UserIcon"
import UserDisplayNameSpan from "../parts/UserDisplayNameSpan"
import UserUserTagSpan from "../parts/UserUserTagSpan"

export default function UserScreen() {

    const { userId } = useParams()
    const [user, setUser] = useState<User | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    async function readUser() {
        const user = await FireUser.readUserFromCache(userId!)
        setUser(user)
        setIsLoaded(true)
    }

    useEffect(() => {
        readUser()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <div className='sticky top-0 z-20'>
                <div className='relative h-14 px-3 flex items-center bg-white/70 dark:bg-black/70 backdrop-blur'>
                    <div className='absolute top-0 left-0 w-full h-full cursor-pointer' onClick={() => window.scrollTo(0, 0)}></div>
                    <BackButton />
                    <span className='font-bold text-lg'>プロフィール</span>
                </div>
            </div>

            {!isLoaded &&
                <div className='flex justify-center'>
                    <img src={progress} alt='loading' />
                </div>
            }

            {isLoaded && user === null &&
                <div className="p-2">
                    <p className="text-gray-500 text-center">読み取りに失敗しました。</p>
                </div>
            }

            {isLoaded && user !== null &&
                <div className="p-3">
                    <div className="flex justify-between">
                        <div className="flex gap-3">
                            <UserIcon iconUrl={user!.iconUrl}/>

                            <div className="flex flex-col">
                                <span className="font-bold">{user!.displayName}</span>
                                <span className="text-gray-500">@{user!.userTag}</span>
                            </div>
                        </div>
                    </div>

                    <p className="mt-2">{user!.introduction}</p>
                </div>
            }
        </div>
    )
}