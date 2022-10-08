import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import User from "../../types/User"
import FireUser from "../../utilities/FireUser"
import BackButton from "../parts/BackButton"
import progress from "../../images/progress.svg"
import UserIcon from "../parts/UserIcon"
import UserMenu from "../parts/UserMenu"

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
                <div className='relative h-14 px-3 flex items-center justify-between bg-white/70 dark:bg-black/70 backdrop-blur'>
                    <div className='absolute top-0 left-0 w-full h-full cursor-pointer' onClick={() => window.scrollTo(0, 0)}></div>

                    <div className="flex items-center">
                        <BackButton />
                        <span className='font-bold text-lg'>プロフィール</span>
                    </div>

                    {isLoaded && user !== null &&
                        <UserMenu user={user!} />
                    }
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
                <div>
                    <div className="flex justify-between mx-3">
                        <div className="flex gap-3">
                            <UserIcon iconUrl={user!.iconUrl} />

                            <div className="flex flex-col">
                                <span className="font-bold">{user!.displayName}</span>
                                <span className="text-gray-500">@{user!.userTag}</span>
                            </div>
                        </div>
                    </div>

                    <p className="mt-2 mx-3">{user!.introduction}</p>

                    <div className="mt-3 flex border-b border-zinc-200 dark:border-zinc-800">
                        <NavLink to={`/users/${userId!}`} className="block w-1/2 text-center p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 border-b-2 border-black dark:border-white">コメント</NavLink>
                        <NavLink to={`/users/${userId!}/likes`} className="block w-1/2 text-center p-3 text-gray-500 hover:bg-zinc-100 dark:hover:bg-zinc-900">いいね</NavLink>
                    </div>
                </div>
            }
        </div>
    )
}