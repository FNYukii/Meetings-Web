import { useEffect, useState } from "react"
import User from "../../entities/User"
import FireAuth from "../../utilities/FireAuth"
import FireUsers from "../../utilities/FireUsers"
import ProgressImage from "../parts/images/ProgressImage"
import EditUserSection from "../parts/sections/EditUserSection"
import FormModal from "../parts/modals/FormModal"

function EditUserModal() {

    const [user, setUser] = useState<User | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        readUser()
    }, [])

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
        <FormModal title="プロフィールを編集 - Meetings">
            <div>
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
        </FormModal>
    )
}

export default EditUserModal