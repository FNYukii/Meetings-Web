import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import User from "../../../entities/User"
import FireUsers from "../../../utilities/FireUsers"

export default function UserDisplayNameLink(props: { userId: string, className?: string }) {

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
        <NavLink to={`/users/${props.userId}`} className={`z-10 pointer-events-auto font-bold hover:underline ${props.className}`}>{user?.displayName}</NavLink>
    )
}