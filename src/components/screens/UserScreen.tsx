import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import User from "../../types/User"
import FireUser from "../../utilities/FireUser"
import BackButton from "../parts/BackButton"

export default function UserScreen() {

    const { userId } = useParams()
    const [user, setUser] = useState<User | null>(null)

    async function readUser() {
        const user = await FireUser.readUserFromCache(userId!)
        setUser(user)
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

            <div className="p-3">
                <p>{userId!}</p>
                <p>{user?.displayName ?? ""}</p>
            </div>
        </div>
    )
}