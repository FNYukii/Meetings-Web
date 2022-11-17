import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import User from "../../entities/User"
import FireAuth from "../../utilities/FireAuth"
import FireUsers from "../../utilities/FireUsers"
import CloseButton from "../parts/buttons/CloseButton"
import ProgressImage from "../parts/images/ProgressImage"
import EditUserSection from "../parts/sections/EditUserSection"

export default function EditUserModal() {

    const navigate = useNavigate()
    const body = document.body

    const [user, setUser] = useState<User | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        readUser()

        document.title = "プロフィールを編集 - Meetings"
        document.addEventListener("keydown", onKeyDown, false)
        body.style.overflowY = "hidden"

        return () => {
            body.style.overflowY = ""
            document.removeEventListener("keydown", onKeyDown, false)
        }
        // eslint-disable-next-line
    }, [])

    const onKeyDown = (event: KeyboardEvent) => {

        if (event.key === "Escape") {
            navigate(-1)
        }
    }

    async function readUser() {

        const uid = FireAuth.uid()
        if (uid === null) {
            setIsLoaded(true)
            return
        }

        const user = await FireUsers.readUser(uid)
        setUser(user)
        if (user === null) {
            setIsLoaded(true)
            return
        }

        setIsLoaded(true)
    }

    return (
        <div className="z-30 fixed top-0 left-0 w-full h-full flex justify-center items-center">

            <div onClick={() => navigate(-1)} className="w-full h-full bg-black/20 dark:bg-white/20"></div>

            <div className="absolute bg-white dark:bg-black p-6 rounded-xl md:width-600 w-11/12 max-height-screen-90">

                <CloseButton />

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
                    <EditUserSection user={user} />
                }
            </div>
        </div>
    )
}