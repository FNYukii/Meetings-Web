import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
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
import CommentsByUserTabBar from "../parts/sections/CommentsByUserTabBar"
import TitleBar from "../parts/sections/TitleBar"

function UserScreen() {

    const { userId } = useParams()
    const location = useLocation()

    const [user, setUser] = useState<User | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    const [selection, setSelection] = useState(0)

    async function listenUser() {

        onSnapshot(doc(db, "users", userId!), (doc) => {

            if (!doc.exists()) {

                console.log(`User does not exists.`)
                setIsLoaded(true)
                return
            }

            const user = FireUsers.toUserFromDocumentSnapshot(doc)
            setUser(user)
            setIsLoaded(true)
        }, (error) => {

            console.log(`User reading failed. ${error}`)
            setIsLoaded(true)
        })
    }

    useEffect(() => {
        listenUser()
        // eslint-disable-next-line
    }, [location])

    return (
        <div>
            <TitleBar justifyBetween>

                <div className="flex items-center">

                    <BackButton className="ml-1"/>
                    <span className='ml-11 font-bold text-lg'>プロフィール</span>
                </div>

                <div className="z-10">
                    {isLoaded && user !== null &&
                        <UserMenu user={user!} className="mr-1"/>
                    }
                </div>
            </TitleBar>

            {!isLoaded &&
                <div className='flex justify-center p-3'>
                    <ProgressImage />
                </div>
            }

            {isLoaded && user === null &&
                <div className="p-2">
                    <p className="text-gray-500 text-center">読み取りに失敗しました。</p>
                </div>
            }

            {isLoaded && user !== null &&
                <div>

                    <div className="flex justify-between mx-3 mt-3">

                        <div className="flex gap-3">

                            <UserIcon iconUrl={user.iconUrl} className="h-16" />

                            <div className="flex flex-col">
                                <span className="font-bold">{user.displayName}</span>
                                <span className="text-gray-500">@{user.userTag}</span>
                            </div>
                        </div>
                    </div>

                    <p className="mt-2 mx-3">{user.introduction}</p>

                    <CommentsByUserTabBar selection={selection} setSelection={setSelection} />

                    <CommentsPostedByUserList user={user} className={selection === 0 ? "" : "hidden"} />
                    <CommentsLikedByUserList user={user} className={selection === 1 ? "" : "hidden"} />
                </div>
            }
        </div>
    )
}

export default UserScreen