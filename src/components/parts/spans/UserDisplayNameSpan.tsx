import { useEffect, useState } from "react"
import User from "../../../entities/User"
import FireUsers from "../../../utilities/FireUsers"

export default function UserDisplayNameSpan(props: {userId: string, className?: string}) {

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
        <span className={`font-bold ${props.className}`}>{user?.displayName}</span>
    )
}