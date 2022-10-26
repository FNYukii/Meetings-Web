import { useState } from "react"
import { useNavigate } from "react-router-dom"
import FireAuth from "../../../utilities/FireAuth"
import FireUsers from "../../../utilities/FireUsers"
import SubmitButton from "../buttons/SubmitButton"

export default function SignUpSection(props: { setIsShowSignUpSection: React.Dispatch<React.SetStateAction<boolean>> }) {

    const navigate = useNavigate()
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    const [displayName, setDisplayName] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const displayNameMax = 30

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {

        setIsLoading(true)

        // フォーム送信を無効
        e.preventDefault()

        // サインアップ
        const uid = await FireAuth.signUp(email, password)

        // 失敗
        if (uid === null) {

            alert("サインアップに失敗しました。")
            setIsLoading(false)
            return
        }

        // 成功
        // Userドキュメントを追加
        const userId = await FireUsers.createUser(uid, displayName)

        // 失敗
        if (userId === null) {
            FireAuth.signOut()
            alert("サインアップに失敗しました。")
            setIsLoading(false)
            return
        }

        // 成功
        navigate(-1)
    }

    return (
        <div>

            <form onSubmit={(e) => onSubmit(e)}>

                <div className="px-3 mt-3">

                    <p className="text-2xl font-bold">アカウントを作成</p>

                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="メールアドレス" className="mt-5 p-2 w-full rounded-md border border-gray-400 dark:border-gray-600 bg-transparent placeholder:text-gray-500" />

                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="パスワード" className="mt-5 p-2 w-full rounded-md border border-gray-400 dark:border-gray-600 bg-transparent placeholder:text-gray-500" />
                    <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} placeholder="パスワードを確認" className="mt-5 p-2 w-full rounded-md border border-gray-400 dark:border-gray-600 bg-transparent placeholder:text-gray-500" />

                    <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="ディスプレイネーム" className="mt-10 p-2 w-full rounded-md border border-gray-400 dark:border-gray-600 bg-transparent placeholder:text-gray-500" />
                </div>

                <div className="mt-3 pl-3 flex justify-between items-center">

                    <button type="button" onClick={() => props.setIsShowSignUpSection(false)} className="hover:underline h-fit">既存のアカウントを使う</button>

                    <SubmitButton text="サインアップ" isLoading={isLoading} disabled={email === "" || password === "" || password !== password2 || displayName === "" || displayName.length > displayNameMax} />
                </div>
            </form>
        </div>
    )
}