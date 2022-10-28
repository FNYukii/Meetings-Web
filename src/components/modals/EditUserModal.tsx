import { useEffect, useState } from "react"
import { MdOutlineClose } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import User from "../../entities/User"
import FireAuth from "../../utilities/FireAuth"
import FireUsers from "../../utilities/FireUsers"
import SubmitButton from "../parts/buttons/SubmitButton"
import ProgressImage from "../parts/images/ProgressImage"
import DynamicTextarea from "../parts/inputs/DynamicTextarea"

export default function EditUserModal() {

    const navigate = useNavigate()
    const body = document.body

    const [displayName, setDisplayName] = useState("")
    const [userTag, setUserTag] = useState("")
    const [introduction, setIntroduction] = useState("")
    const [user, setUser] = useState<User | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const displayNameMax = 30
    const userTagMax = 30
    const introductionMax = 300


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
            setIsLoaded(true)
            return
        }

        const user = await FireUsers.readUser(uid)
        setUser(user)
        if (user === null) {
            setIsLoaded(true)
            return
        }

        setDisplayName(user.displayName)
        setUserTag(user.userTag)
        setIntroduction(user.introduction)
        setIsLoaded(true)
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsLoading(true)

        // ログイン状態を確認
        const uid = FireAuth.uid()
        if (uid === null) {

            setIsLoading(false)
            return
        }

        // userTagの形式を確認
        if (!userTag.match(/^\w{5,}$/)) {
            alert("ユーザータグの形式が不正です。")
            setIsLoading(false)
            return
        }

        // userTagの重複を確認
        const isUserTagDuplicate = await FireUsers.readIsUserTagDuplicate(userTag)

        if (isUserTagDuplicate === null) {
            alert("ユーザータグの重複の確認に失敗しました。")
            setIsLoading(false)
            return
        }

        if (isUserTagDuplicate) {
            alert("そのユーザータグは既に利用されています。")
            setIsLoading(false)
            return
        }

        // userドキュメントを更新
        const userId = await FireUsers.updateUser(uid, displayName, userTag, introduction, null)

        // 失敗
        if (userId === null) {
            alert("プロフィールの更新に失敗しました。")
            setIsLoading(false)
            return
        }

        // 成功
        navigate(-1)
    }

    return (
        <div className="z-30 fixed top-0 left-0 w-full h-full flex justify-center items-center">

            <div onClick={() => navigate(-1)} className="w-full h-full bg-black/20 dark:bg-white/20"></div>

            <div className="absolute bg-white dark:bg-black p-6 rounded-xl md:width-600 w-11/12 max-height-screen-90 overflow-scroll">

                <button onClick={() => navigate(-1)} className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full">
                    <MdOutlineClose className="text-2xl text-gray-500" />
                </button>


                {!isLoaded &&
                    <div className='flex justify-center p-3'>
                        <ProgressImage />
                    </div>
                }

                {isLoaded && user === null &&
                    <div className="p-2">
                        <p className="text-gray-500 text-center">読み取りに失敗しました。</p>
                    </div>
                }

                {isLoaded && user !== null &&

                    <div>

                        <p className="ml-3 mt-3 font-bold text-2xl">プロフィールを編集</p>

                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className="px-3 mt-3">

                                <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="ディスプレイネーム" className="w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                                <input type="text" value={userTag} onChange={(e) => setUserTag(e.target.value)} placeholder="ユーザータグ" className="mt-5 w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />

                                <DynamicTextarea value={introduction} setValue={setIntroduction} placeholder="自己紹介" className="mt-5 w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                            </div>

                            <div className="mt-3 flex justify-end">
                                <SubmitButton text="保存" isLoading={isLoading} disabled={!displayName.match(/\S/g) || displayName.length > displayNameMax || !userTag.match(/\S/g) || userTag.length > userTagMax || introduction.length > introductionMax} />
                            </div>
                        </form>
                    </div>
                }
            </div>
        </div>
    )
}