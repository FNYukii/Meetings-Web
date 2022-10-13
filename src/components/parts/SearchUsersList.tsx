import { useEffect, useState } from "react"
import User from "../../entities/User"
import FireUser from "../../utilities/FireUser"
import ProgressImage from "./ProgressImage"
import UserRow from "./UserRow"

export default function SearchUsersList(props: { keyword: string, className?: string }) {

    const [users, setUsers] = useState<User[] | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    async function readUsers() {

        setIsLoaded(false)
        const users = await FireUser.readUsersByKeyword(props.keyword)
        setUsers(users)
        setIsLoaded(true)
    }

    useEffect(() => {

        readUsers()
        // eslint-disable-next-line
    }, [props.keyword])

    return (
        <div className={props.className}>

            {!isLoaded &&
                <div className='flex justify-center p-3'>
                    <ProgressImage/>
                </div>
            }

            {isLoaded && users === null &&
                <div className="p-3">
                    <p className="text-gray-500 text-center">読み取りに失敗しました。</p>
                </div>
            }

            {isLoaded && users !== null && users.length === 0 &&
                <div className="p-3">
                    <p className="text-gray-500 text-center">結果なし</p>
                </div>
            }

            {isLoaded && users !== null &&
                <div>
                    {users.map((user) => (
                        <UserRow key={user.id} user={user}/>
                    ))}
                </div>
            }
        </div>
    )
}