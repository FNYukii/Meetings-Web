import { useNavigate } from "react-router-dom"
import FireAuth from "../../../utilities/FireAuth"
import ConfirmationDialog from "./ConfirmationDialog"

function SignOutDialog(props: { setIsShowDialog: React.Dispatch<React.SetStateAction<boolean>> }) {

    const navigate = useNavigate()

    async function signOut() {

        // サインアウト
        const userId = await FireAuth.signOut()
        if (!userId) return

        // リダイレクト
        navigate('/')
    }

    return (
        <ConfirmationDialog setIsShowDialog={props.setIsShowDialog}>
            <div className="px-3">
                <p className="text-xl font-bold">サインアウトしてもよろしいですか?</p>
            </div>

            <div className="mt-3 flex justify-between">

                <button onClick={() => props.setIsShowDialog(false)} className="py-1 px-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900">キャンセル</button>
                <button onClick={signOut} className="text-red-500 py-1 px-3 font-bold rounded-full hover:bg-red-100 dark:hover:bg-red-900">サインアウト</button>
            </div>
        </ConfirmationDialog>
    )
}

export default SignOutDialog