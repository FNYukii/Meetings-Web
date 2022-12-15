import { useState } from "react"
import SubmitButton from "../parts/buttons/SubmitButton"
import FormModal from "../parts/modals/FormModal"

function EditEmailModal() {

    const [currentEmail, setCurrentEmailmail] = useState("")
    const [newEmail, setNewEmail] = useState("")

    const [password, setPassword] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    return (
        <FormModal title="メールアドレスを編集 - Meetings">

            <form>
                
                <div className="px-3">
                    <p className="text-2xl font-bold">メールアドレスを編集</p>

                    <input type="email" value={currentEmail} onChange={(e) => setCurrentEmailmail(e.target.value)} placeholder="現在のメールアドレス" className="mt-5 w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                    <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="新しいメールアドレス" className="mt-5 w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />

                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="パスワード" className="mt-5 w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                </div>

                <div className="mt-3 pl-3 flex justify-end items-center">
                    <SubmitButton text="完了" disabled={currentEmail === "" || newEmail === "" || password === ""} isLoading={isLoading} />
                </div>
            </form>
        </FormModal>
    )
}

export default EditEmailModal