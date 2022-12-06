import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import FireUsers from "../../../utilities/FireUsers"
import User from "../../../entities/User"

function UserIconLink(props: { userId: string }) {

    const [user, setUser] = useState<User | null>(null)

    async function read() {
        const user: User | null = await FireUsers.readUserFromCache(props.userId)
        setUser(user)
    }

    useEffect(() => {
        read()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="z-10 relative h-12 aspect-square rounded-full">

            <div className="w-full h-full bg-gray-200 dark:bg-gray-800 rounded-full"></div>

            <NavLink to={`/users/${props.userId}`} className="absolute top-0 left-0 w-full h-full rounded-full">

                {user !== null && user.iconUrl !== null &&
                    <img className="w-full h-full rounded-full" src={user.iconUrl} alt="" />
                }
                <div className="absolute top-0 left-0 hover:bg-black/20 dark:hover:bg-white/20 transition w-full h-full rounded-full"></div>
            </NavLink>
        </div>
    )
}

export default UserIconLink