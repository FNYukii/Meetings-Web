import { useEffect, useState } from "react"
import User from "../../types/User"
import FireUser from "../../utilities/FireUser"

export default function UserDisplayNameSpan(props: {userId: string}) {

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
        <span className="font-bold">{user?.displayName}</span>
    )
}