import { useEffect, useState } from "react"
import { MdOutlineClose } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import FireAuth from "../../utilities/FireAuth"
import FireUsers from "../../utilities/FireUsers"
import ProgressImage from "../parts/images/ProgressImage"

export default function EditUserModal() {

    const navigate = useNavigate()
    const [displayName, setDisplayName] = useState("")
    const [userTag, setUserTag] = useState("")
    const [introduction, setIntroduction] = useState("")
    const body = document.body

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        readUser()

        document.title = "プロフィールを編集 - Meetings"
        document.addEventListener("keydown", onKeyDown, false)
        body.style.overflowY = "hidden"
        
        return () => {
            body.style.overflowY = ""
            document.removeEventListener("keydown", onKeyDown, false)
        }
        // eslint-disable-next-line
    }, [])

    const onKeyDown = (event: KeyboardEvent) => {

        if (event.key === "Escape") {
            navigate(-1)
        }
    }

    async function readUser() {

        const uid = FireAuth.uid()
        if (uid === null) {
            return
        }

        const user = await FireUsers.readUser(uid)
        if (user === null) {
            return
        }

        setDisplayName(user.displayName)
        setUserTag(user.userTag)
        setIntroduction(user.introduction)
        setIsLoaded(true)
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        // ログイン状態を確認
        const uid = FireAuth.uid()
        if (uid === null) {
            return
        }

        // userドキュメントを更新
        const userId = await FireUsers.updateUser(uid, displayName, userTag, introduction, null)

        // 失敗
        if (userId === null) {
            alert("プロフィールの更新に失敗しました。")
            return
        }

        // 成功
        navigate(-1)
    }

    return (
        <div className="z-30 fixed top-0 left-0 w-full h-full flex justify-center items-center">

            <div onClick={() => navigate(-1)} className="w-full h-full bg-black/20 dark:bg-white/20"></div>

            <div className="absolute bg-white dark:bg-black p-6 rounded-xl md:width-600 w-11/12">

                <button onClick={() => navigate(-1)} className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full">
                    <MdOutlineClose className="text-2xl text-gray-500" />
                </button>

                <p className="ml-3 mt-3 font-bold text-2xl">プロフィールを編集</p>

                {!isLoaded &&
                    <div className='flex justify-center p-3'>
                        <ProgressImage />
                    </div>
                }

                {isLoaded &&
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="px-3 mt-3">

                            <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="ディスプレイネーム" className="p-2 w-full rounded-md border border-gray-400 dark:border-gray-600 bg-transparent placeholder:text-gray-500" />
                            <input type="text" value={userTag} onChange={(e) => setUserTag(e.target.value)} placeholder="ユーザータグ" className="mt-5 p-2 w-full rounded-md border border-gray-400 dark:border-gray-600 bg-transparent placeholder:text-gray-500" />

                            <textarea value={introduction} onChange={(e) => setIntroduction(e.target.value)} placeholder="自己紹介" className="mt-5 h-24 resize-none p-3 border rounded-md border-gray-400 dark:border-gray-600 bg-transparent placeholder:text-gray-500 w-full" />
                        </div>

                        <div className="mt-3 flex justify-end">
                            <button type="submit" disabled={displayName === "" || userTag === "" || introduction === ""} className={`font-bold p-3 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 ${displayName === "" || userTag === "" || introduction === "" ? "text-gray-400 dark:text-gray-600 hover:bg-transparent dark:hover:bg-transparent" : ""}`}>保存</button>
                        </div>
                    </form>
                }
            </div>
        </div>
    )
}