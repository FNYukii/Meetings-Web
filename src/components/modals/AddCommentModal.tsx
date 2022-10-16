import { useEffect, useState } from "react"
import { MdOutlineClose } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"
import FireComments from "../../utilities/FireComments"

export default function AddCommentModal() {

    const { threadId } = useParams()
    const navigate = useNavigate()
    const body = document.body

    const [text, setText] = useState("")
    const [isSubmited, setIsSubmited] = useState(false)

    useEffect(() => {

        document.title = "新規コメント - Meetings"
        document.addEventListener("keydown", onKeyDown, false)
        body.style.overflowY = "hidden"
        
        return () => {
            document.removeEventListener("keydown", onKeyDown, false)
            body.style.overflowY = ""
        }
    })

    const onKeyDown = (event: KeyboardEvent) => {

        if (event.key === "Escape") {
            navigate(-1)
        }
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault()
        setIsSubmited(true)

        const commentId = await FireComments.createComment(threadId!, text, [])

        // 失敗
        if (commentId === null) {

            alert("コメントの追加に失敗しました。")
            setIsSubmited(false)
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

                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="mt-3 px-3">

                        <p className="text-2xl font-bold">新しいコメント</p>

                        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="コメント" className="mt-5 h-24 resize-none p-3 rounded-md border border-gray-400 dark:border-gray-600 bg-transparent placeholder:text-gray-500 w-full" />
                    </div>

                    <div className="mt-3 flex justify-end">
                        <button disabled={text === "" || isSubmited} className={`font-bold p-3 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 ${text === "" || isSubmited ? "text-gray-400 dark:text-gray-600 hover:bg-transparent dark:hover:bg-transparent" : ""}`}>追加</button>
                    </div>
                </form>
            </div>
        </div>
    )
}