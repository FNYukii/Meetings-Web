import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import User from "../../entities/User"
import FireUsers from "../../utilities/FireUsers"
import BackButton from "../parts/buttons/BackButton"
import UserIcon from "../parts/images/UserIcon"
import UserMenu from "../parts/menus/UserMenu"
import CommentsPostedByUserList from "../parts/lists/CommentsPostedByUserList"
import CommentsLikedByUserList from "../parts/lists/CommentsLikedByUserList"
import ProgressImage from "../parts/images/ProgressImage"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../../utilities/firebase"

export default function UserScreen() {

    const { userId } = useParams()
    const [user, setUser] = useState<User | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    const [tab, setTab] = useState(0)

    async function readUser() {

        onSnapshot(doc(db, "users", userId!), (doc) => {

            const user = FireUsers.toUserFromDocumentSnapshot(doc)
            setUser(user)
            setIsLoaded(true)
        }, (error) => {

            setIsLoaded(true)
        })
    }

    useEffect(() => {
        readUser()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <div className='sticky top-0 z-20'>
                <div className='relative h-14 pl-1 pr-3 flex items-center justify-between bg-white/70 dark:bg-black/70 backdrop-blur'>
                    <div className='absolute top-0 left-0 w-full h-full cursor-pointer' onClick={() => window.scrollTo(0, 0)}></div>

                    <div className="flex items-center">
                        <BackButton />
                        <span className='font-bold text-lg ml-11'>プロフィール</span>
                    </div>

                    {isLoaded && user !== null &&
                        <UserMenu user={user!} />
                    }
                </div>
            </div>

            {!isLoaded &&
                <div className='flex justify-center p-3'>
                    <ProgressImage/>
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
                            <UserIcon iconUrl={user!.iconUrl} className="h-16" />

                            <div className="flex flex-col">
                                <span className="font-bold">{user!.displayName}</span>
                                <span className="text-gray-500">@{user!.userTag}</span>
                            </div>
                        </div>
                    </div>

                    <p className="mt-2 mx-3">{user!.introduction}</p>

                    <div className="flex border-b border-zinc-200 dark:border-zinc-800 mt-3">

                        <button onClick={() => setTab(0)} className="w-1/2 hover:bg-zinc-100 dark:hover:bg-zinc-900 relative">

                            <div className="text-center p-3">

                                <span className={tab === 0 ? "font-bold" : ""}>コメント</span>

                                <div className="absolute bottom-0 left-0 w-full">
                                    <div className={`h-0.5 mx-3 ${tab === 0 ? "bg-black dark:bg-white" : ""}`}></div>
                                </div>
                            </div>
                        </button>

                        <button onClick={() => setTab(1)} className="w-1/2 hover:bg-zinc-100 dark:hover:bg-zinc-900 relative">

                            <div className="text-center p-3">

                                <span className={tab === 1 ? "font-bold" : ""}>いいね</span>

                                <div className="absolute bottom-0 left-0 w-full">
                                    <div className={`h-0.5 mx-3 ${tab === 1 ? "bg-black dark:bg-white" : ""}`}></div>
                                </div>
                            </div>
                        </button>
                    </div>

                    {tab === 0 &&
                        <CommentsPostedByUserList/>
                    }

                    {tab === 1 &&
                        <CommentsLikedByUserList/>
                    }

                </div>
            }
        </div>
    )
}