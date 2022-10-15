import { useState } from "react"
import { useNavigate } from "react-router-dom"
import FireAuth from "../../utilities/FireAuth"

export default function SignInSection(props: {setIsShowSignUpSection: React.Dispatch<React.SetStateAction<boolean>>}) {

    const navigate = useNavigate()
    const body = document.body

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function closeModal() {

        body.style.overflowY = ""
        navigate(-1)
    }

    async function signIn() {

        const result = await FireAuth.signIn(email, password)

        // 成功
        if (result !== null) {
            closeModal()
            return
        }

        // 失敗
        setEmail("")
        setPassword("")
    }

    return (
        <div>

            <div className="px-3 mt-3">

                <h2 className="text-2xl font-bold">サインイン</h2>

                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="メールアドレス" className="mt-5 p-2 w-full rounded-md border border-gray-500 bg-transparent placeholder:text-gray-500" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="パスワード" className="mt-5 p-2 w-full rounded-md border border-gray-500 bg-transparent placeholder:text-gray-500" />
            </div>

            <div className="mt-3 pl-3 flex justify-between items-center">

                <button onClick={() => props.setIsShowSignUpSection(true)} className="hover:underline h-fit">新しいアカウントを作成</button>
                <button onClick={signIn} disabled={email === "" || password === ""} className={`font-bold p-3 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 ${email === "" || password === "" ? "text-gray-400 dark:text-gray-600 hover:bg-transparent dark:hover:bg-transparent" : ""}`}>サインイン</button>
            </div>
        </div>
    )
}