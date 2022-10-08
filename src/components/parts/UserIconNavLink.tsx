import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import FireUser from "../../utilities/FireUser"
import User from "../../types/User"

export default function UserIconNavLink(props: { userId: string }) {

    const [user, setUser] = useState<User | null>()

    async function read() {
        const user: User | null = await FireUser.readUserFromCache(props.userId)
        setUser(user)
    }

    useEffect(() => {
        read()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="hover:opacity-60 z-10 relative w-12 h-11">

            <div className="bg-zinc-200 dark:bg-zinc-800 rounded-full absolute top-0 left-0 w-full aspect-square"></div>
            
            <img className="rounded-full absolute top-0 left-0 w-full" src={user?.iconUrl} alt="" />

            <NavLink to={`/users/${props.userId}`} className="absolute top-0 left-0 w-full h-full rounded-full" />
        </div>
    )
}