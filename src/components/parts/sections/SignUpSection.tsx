import { useState } from "react"
import { useNavigate } from "react-router-dom"
import FireAuth from "../../../utilities/FireAuth"
import FireUsers from "../../../utilities/FireUsers"
import SubmitButton from "../buttons/SubmitButton"
import PasswordInput from "../inputs/PasswordInput"

function SignUpSection(props: { setIsShowSignUpSection: React.Dispatch<React.SetStateAction<boolean>> }) {

    const navigate = useNavigate()
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")

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

                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="メールアドレス" className="mt-5 py-2 w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />

                    <PasswordInput value={password} onChange={setPassword} />
                    <PasswordInput value={passwordConfirm} onChange={setPasswordConfirm} placeholder="パスワードを確認" />

                    <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="ディスプレイネーム" className="mt-10 w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                </div>

                <div className="mt-3 pl-3 flex justify-between items-center">

                    <button type="button" onClick={() => props.setIsShowSignUpSection(false)} className="hover:underline h-fit">既存のアカウントを使う</button>

                    <SubmitButton text="サインアップ" isLoading={isLoading} disabled={email === "" || password === "" || password !== passwordConfirm || !displayName.match(/\S/g) || displayName.length > displayNameMax} />
                </div>
            </form>
        </div>
    )
}

export default SignUpSection