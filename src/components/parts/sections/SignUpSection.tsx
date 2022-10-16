import { useState } from "react"
import { useNavigate } from "react-router-dom"
import FireAuth from "../../../utilities/FireAuth"
import FireUsers from "../../../utilities/FireUsers"

export default function SignUpSection(props: { setIsShowSignUpSection: React.Dispatch<React.SetStateAction<boolean>> }) {

    const navigate = useNavigate()
    const body = document.body

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    const [displayName, setDisplayName] = useState("")
    const [userTag, setUserTag] = useState("")
    const [isSubmited, setIsSubmited] = useState(false)

    function closeModal() {

        body.style.overflowY = ""
        navigate(-1)
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {

        setIsSubmited(true)

        // フォーム送信を無効
        e.preventDefault()

        // userTagの形式を確認
        if (!userTag.match(/^\w{5,}$/)) {
            alert("ユーザータグの形式が不正です。")
            return
        }

        // userTagの重複を確認
        const isUserTagDuplicate = await FireUsers.readIsUserTagDuplicate(userTag)
        if (isUserTagDuplicate) {
            alert("そのユーザータグは既に利用されています。")
        }

        // サインアップ
        const uid = await FireAuth.signUp(email, password)

        // 失敗
        if (uid === null) {

            setIsSubmited(false)
            alert("サインアップに失敗しました。")
            return
        }

        // 成功
        // Userドキュメントを追加
        const userId = await FireUsers.createUser(uid, displayName, userTag)

        // 失敗
        if (userId === null) {
            FireAuth.signOut()
            return
        }

        // 成功
        closeModal()
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
                    <input type="text" value={userTag} onChange={(e) => setUserTag(e.target.value)} placeholder="ユーザータグ" className="mt-5 p-2 w-full rounded-md border border-gray-400 dark:border-gray-600 bg-transparent placeholder:text-gray-500" />
                </div>

                <div className="mt-3 pl-3 flex justify-between items-center">

                    <button type="button" onClick={() => props.setIsShowSignUpSection(false)} className="hover:underline h-fit text-gray-500">既存のアカウントを使う</button>
                    <button type="submit" disabled={email === "" || password === "" || password !== password2 || displayName === "" || userTag === "" || isSubmited} className={`font-bold p-3 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 ${email === "" || password === "" || password !== password2 || displayName === "" || userTag === "" || isSubmited ? "text-gray-400 dark:text-gray-600 hover:bg-transparent dark:hover:bg-transparent" : ""}`}>サインアップ</button>
                </div>
            </form>
        </div>
    )
}