import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import FireUsers from "../../utilities/FireUsers"
import User from "../../entities/User"

export default function UserIconNavLink(props: { userId: string }) {

    const [user, setUser] = useState<User | null>()

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

            <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
            
            <NavLink to={`/users/${props.userId}`} className="absolute top-0 left-0 w-full h-full rounded-full">
                <img className="w-full h-full rounded-full" src={user?.iconUrl} alt="" />
                <div className="absolute top-0 left-0 hover:bg-black/20 dark:hover:bg-white/20 w-full h-full rounded-full"></div>
            </NavLink>
        </div>
    )
}