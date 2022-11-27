import { useState } from "react"
import { useNavigate } from "react-router-dom"
import FireAuth from "../../../utilities/FireAuth"
import SubmitButton from "../buttons/SubmitButton"

function SignInSection(props: { setIsShowSignUpSection: React.Dispatch<React.SetStateAction<boolean>> }) {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {

        setIsLoading(true)

        // フォーム送信を無効
        e.preventDefault()

        const uid = await FireAuth.signIn(email, password)

        // 失敗
        if (uid === null) {

            alert("サインインに失敗しました。")
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

                    <p className="text-2xl font-bold">サインイン</p>

                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="メールアドレス" className="mt-5 w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="パスワード" className="mt-5 w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                </div>

                <div className="mt-3 pl-3 flex justify-between items-center">

                    <button type="button" onClick={() => props.setIsShowSignUpSection(true)} className="hover:underline h-fit">新しいアカウントを作成</button>

                    <SubmitButton text="サインイン" disabled={email === "" || password === ""} isLoading={isLoading}/>
                </div>
            </form>
        </div>
    )
}

export default SignInSection