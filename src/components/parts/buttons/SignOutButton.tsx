import { useState } from "react"
import { AiOutlineLogout } from "react-icons/ai"
import SignOutDialog from "../dialogs/SignOutDialog"

function SignOutButton() {

    const [isShowDialog, setIsShowDialog] = useState(false)

    return (
        <div>
            <button onClick={() => setIsShowDialog(true)} className="w-full">
                <div className="p-3 hover:bg-gray-100 dark:hover:bg-gray-900">

                    <div className="flex gap-3 items-center text-red-500">
                        <AiOutlineLogout className="text-2xl" />
                        <span>サインアウト</span>
                    </div>
                </div>
            </button>

            {isShowDialog &&
                <SignOutDialog setIsShowDialog={setIsShowDialog} />
            }
        </div>
    )
}

export default SignOutButton