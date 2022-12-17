import { useState } from "react"
import SubmitButton from "../parts/buttons/SubmitButton"
import EmailInput from "../parts/inputs/EmailInput"
import PasswordInput from "../parts/inputs/PasswordInput"
import FormModal from "../parts/modals/FormModal"

function EditEmailModal() {

    const [currentEmail, setCurrentEmail] = useState("")
    const [newEmail, setNewEmail] = useState("")

    const [password, setPassword] = useState("")

    // eslint-disable-next-line
    const [isLoading, setIsLoading] = useState(false)

    return (
        <FormModal title="メールアドレスを変更 - Meetings">

            <form>
                
                <div className="px-3">
                    <p className="text-2xl font-bold">メールアドレスを変更</p>
                    
                    <EmailInput value={currentEmail} onChange={setCurrentEmail} placeholder="現在のメールアドレス" className="mt-3"/>
                    <EmailInput value={newEmail} onChange={setNewEmail} placeholder="新しいメールアドレス" className="mt-3"/>

                    <PasswordInput value={password} onChange={setPassword} className="mt-3" />
                </div>

                <div className="mt-3 pl-3 flex justify-end items-center">
                    <SubmitButton text="完了" disabled={currentEmail === "" || newEmail === "" || password === ""} isLoading={isLoading} />
                </div>
            </form>
        </FormModal>
    )
}

export default EditEmailModal