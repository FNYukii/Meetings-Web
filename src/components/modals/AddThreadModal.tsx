import { useEffect, useState } from "react"
import { MdOutlineClose } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import FireComments from "../../utilities/FireComments"
import FireThreads from "../../utilities/FireThreads"

export default function AddThreadModal() {

    const navigate = useNavigate()
    const body = document.body

    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [isSubmited, setIsSubmited] = useState(false)

    const titleMax = 100
    const commentTextMax = 300

    useEffect(() => {

        document.title = "新規コメント - Meetings"
        document.addEventListener("keydown", onKeyDown, false)
        body.style.overflowY = "hidden"

        return () => {
            document.removeEventListener("keydown", onKeyDown, false)
            body.style.overflowY = ""
        }

        // eslint-disable-next-line
    }, [])

    function onKeyDown(event: KeyboardEvent) {

        if (event.key === "Escape") {
            navigate(-1)
        }
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault()
        setIsSubmited(true)

        // スレッドを作成
        const threadId = await FireThreads.createThread(title, [])

        // 失敗
        if (threadId === null) {

            setIsSubmited(false)
            alert("スレッドの作成に失敗しました。")
            return
        }

        // 成功
        // コメントを作成
        await FireComments.createComment(threadId, text, [])
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

                        <p className="text-2xl font-bold">新しいスレッド</p>

                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="タイトル" className="mt-5 p-2 w-full rounded-md border border-gray-400 dark:border-gray-600 bg-transparent placeholder:text-gray-500" />
                        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="コメント" className="h-24 resize-none mt-3 p-3 rounded-md border border-gray-400 dark:border-gray-600 bg-transparent placeholder:text-gray-500 w-full" />
                    </div>

                    <div className="mt-3 flex justify-end">
                        <button disabled={title === "" || title.length > titleMax || text === "" || text.length > commentTextMax || isSubmited} className={`font-bold p-3 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 ${title === "" || title.length > titleMax || text === "" || text.length > commentTextMax || isSubmited ? "text-gray-400 dark:text-gray-600 hover:bg-transparent dark:hover:bg-transparent" : ""}`}>作成</button>
                    </div>
                </form>
            </div>
        </div>
    )
}