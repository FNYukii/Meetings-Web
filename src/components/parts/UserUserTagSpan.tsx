import { useEffect, useState } from "react"
import User from "../../entities/User"
import FireUser from "../../utilities/FireUser"

export default function UserUserTagSpan(props: {userId: string, className?: string}) {

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
        <span className={`text-gray-500 ${props.className}`}>@{user?.userTag}</span>
    )
}