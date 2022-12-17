import { useState } from "react"
import SubmitButton from "../parts/buttons/SubmitButton"
import PasswordInput from "../parts/inputs/PasswordInput"
import FormModal from "../parts/modals/FormModal"

function EditPasswordModal() {

    const [currentPassword, setCurrentPassword] = useState("")

    const [newPassword, setNewPassword] = useState("")
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("")

    // eslint-disable-next-line
    const [isLoading, setIsLoading] = useState(false)

    return (
        <FormModal title="パスワードを変更 - Meetings">

            <form>
                <div className="px-3">
                    <p className="text-2xl font-bold">パスワードを変更</p>

                    <PasswordInput value={currentPassword} onChange={setCurrentPassword} placeholder="現在のパスワード" className="mt-3" />
                    <PasswordInput value={newPassword} onChange={setNewPassword} placeholder="新しいパスワード" className="mt-3" />
                    <PasswordInput value={newPasswordConfirm} onChange={setNewPasswordConfirm} placeholder="新しいパスワードを確認" className="mt-3" />
                </div>

                <div className="mt-3 pl-3 flex justify-end items-center">
                    <SubmitButton text="完了" disabled={currentPassword === "" || newPassword === "" || newPassword !== newPasswordConfirm} isLoading={isLoading} />
                </div>
            </form>
        </FormModal>
    )
}

export default EditPasswordModal