import { useState } from "react"
import SubmitButton from "../parts/buttons/SubmitButton"
import FormModal from "../parts/modals/FormModal"

function EditPasswordModal() {

    const [currentPassword, setCurrentPassword] = useState("")

    const [newPassword, setNewPassword] = useState("")
    const [newPassworConfirm, setNewPasswordConfirm] = useState("")

    // eslint-disable-next-line
    const [isLoading, setIsLoading] = useState(false)

    return (
        <FormModal title="パスワードを変更 - Meetings">

            <form>
                <div className="px-3">
                    <p className="text-2xl font-bold">パスワードを変更</p>

                    <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="現在のパスワード" className="mt-5 w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />

                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="新しいパスワード" className="mt-5 w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                    <input type="password" value={newPassworConfirm} onChange={(e) => setNewPasswordConfirm(e.target.value)} placeholder="新しいパスワードを確認" className="mt-5 w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                </div>

                <div className="mt-3 pl-3 flex justify-end items-center">
                    <SubmitButton text="完了" disabled={currentPassword === "" || newPassword === "" || newPassword !== newPassworConfirm} isLoading={isLoading} />
                </div>
            </form>
        </FormModal>
    )
}

export default EditPasswordModal