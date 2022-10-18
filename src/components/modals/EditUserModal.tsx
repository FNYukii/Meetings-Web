import { useEffect, useState } from "react"
import { MdOutlineClose } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import FireAuth from "../../utilities/FireAuth"
import FireUsers from "../../utilities/FireUsers"

export default function EditUserModal() {

    const navigate = useNavigate()
    const [displayName, setDisplayName] = useState("")
    const [userTag, setUserTag] = useState("")
    const [introduction, setIntroduction] = useState("")

    useEffect(() => {
        readUser()
    })

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
    }

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        alert("hello")
    }

    return (
        <div className="z-30 fixed top-0 left-0 w-full h-full flex justify-center items-center">

            <div onClick={() => navigate(-1)} className="w-full h-full bg-black/20 dark:bg-white/20"></div>

            <div className="absolute bg-white dark:bg-black p-6 rounded-xl md:width-600 w-11/12">

                <button onClick={() => navigate(-1)} className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full">
                    <MdOutlineClose className="text-2xl text-gray-500" />
                </button>

                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="px-3 mt-3">

                        <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="ディスプレイネーム" className="p-2 w-full rounded-md border border-gray-400 dark:border-gray-600 bg-transparent placeholder:text-gray-500" />
                        <input type="text" value={userTag} onChange={(e) => setUserTag(e.target.value)} placeholder="ユーザータグ" className="mt-5 p-2 w-full rounded-md border border-gray-400 dark:border-gray-600 bg-transparent placeholder:text-gray-500" />

                        <textarea value={introduction} onChange={(e) => setIntroduction(e.target.value)} placeholder="自己紹介" className="mt-5 h-24 resize-none p-3 border rounded-md border-gray-400 dark:border-gray-600 bg-transparent placeholder:text-gray-500 w-full" />
                    </div>

                    <div className="mt-3 flex justify-end">
                        <button type="submit" disabled={displayName === "" || userTag === "" || introduction === ""} className={`font-bold p-3 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 ${displayName === "" || userTag === "" || introduction === ""? "text-gray-400 dark:text-gray-600 hover:bg-transparent dark:hover:bg-transparent" : ""}`}>保存</button>
                    </div>
                </form>
            </div>
        </div>
    )
}