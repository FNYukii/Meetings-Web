import { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import FireAuth from "../../../utilities/FireAuth";
import SignOutDialog from "../dialogs/SignOutDialog";

function SignOutButton() {

    const navigate = useNavigate()

    const [isShowDialog, setIsShowDialog] = useState(false)

    async function signOut() {

        // サインアウト
        const userId = await FireAuth.signOut()
        if (!userId) return

        // リダイレクト
        navigate('/')
    }

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