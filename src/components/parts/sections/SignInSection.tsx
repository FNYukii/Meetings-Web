import { useState } from "react"
import { useNavigate } from "react-router-dom"
import FireAuth from "../../../utilities/FireAuth"

export default function SignInSection(props: { setIsShowSignUpSection: React.Dispatch<React.SetStateAction<boolean>> }) {

    const navigate = useNavigate()
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSubmited, setIsSubmited] = useState(false)

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {

        setIsSubmited(true)

        // フォーム送信を無効
        e.preventDefault()

        const uid = await FireAuth.signIn(email, password)

        // 失敗
        if (uid === null) {

            alert("サインインに失敗しました。")
            setIsSubmited(false)
            return
        }

        // 成功
        navigate(-1)
    }

    return (
        <div>

            <form onSubmit={(e) => onSubmit(e)}>

                <div className="px-3 mt-3">

                    <p className="text-2xl font-bold">サインイン</p>

                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="メールアドレス" className="mt-5 p-2 w-full rounded-md border border-gray-400 dark:border-gray-600 bg-transparent placeholder:text-gray-500" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="パスワード" className="mt-5 p-2 w-full rounded-md border border-gray-400 dark:border-gray-600 bg-transparent placeholder:text-gray-500" />
                </div>

                <div className="mt-3 pl-3 flex justify-between items-center">

                    <button type="button" onClick={() => props.setIsShowSignUpSection(true)} className="hover:underline h-fit text-gray-500">新しいアカウントを作成</button>
                    <button type="submit" disabled={email === "" || password === "" || isSubmited} className={`font-bold p-3 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 ${email === "" || password === "" || isSubmited ? "text-gray-400 dark:text-gray-600 hover:bg-transparent dark:hover:bg-transparent" : ""}`}>サインイン</button>
                </div>
            </form>
        </div>
    )
}