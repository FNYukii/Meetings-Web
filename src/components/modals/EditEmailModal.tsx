import { useState } from "react"
import FormModal from "../parts/modals/FormModal"

function EditEmailModal() {

    const [currentEmail, setCurrentEmailmail] = useState("")
    const [newEmail, setNewEmail] = useState("")

    const [password, setPassword] = useState("")

    return (
        <FormModal title="メールアドレスを編集 - Meetings">
            <div className="px-3">
                <p className="text-2xl font-bold">メールアドレスを編集</p>

                <input type="email" value={currentEmail} onChange={(e) => setCurrentEmailmail(e.target.value)} placeholder="現在のメールアドレス" className="mt-5 w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="新しいメールアドレス" className="mt-5 w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />

                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="パスワード" className="mt-5 w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />
            </div>
        </FormModal>
    )
}

export default EditEmailModal