import { useEffect, useState } from "react"
import { AiOutlinePlus, AiOutlineTag } from "react-icons/ai"
import { MdOutlineClose } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import FireComments from "../../utilities/FireComments"
import FireThreads from "../../utilities/FireThreads"
import SubmitButton from "../parts/buttons/SubmitButton"

export default function AddThreadModal() {

    const navigate = useNavigate()
    const body = document.body

    const [title, setTitle] = useState("")
    const [tags, setTags] = useState<string[]>([])
    const [text, setText] = useState("")
    const [isLoading, setIsLoading] = useState(false)

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

    function addTag() {
        setTags([...tags, 'apple'])
    }

    function removeTag(tagIndex: number) {
        setTags(
            tags.filter((tag, index) => (index !== tagIndex))
        )
    }

    function onKeyDown(event: KeyboardEvent) {

        if (event.key === "Escape") {
            navigate(-1)
        }
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault()
        setIsLoading(true)

        // スレッドを作成
        const threadId = await FireThreads.createThread(title, [])

        // 失敗
        if (threadId === null) {

            setIsLoading(false)
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

                        {tags.map((tag, index) => (

                            <div key={index} className="mt-3 flex items-center gap-3">

                                <AiOutlineTag className="text-gray-500" />
                                <input type="text" placeholder="タグ" className="border-b p-2 focus:outline-none focus:border-sky-500" />

                                <button type="button" onClick={() => removeTag(index)}>
                                    <MdOutlineClose className="text-xl text-gray-500 hover:text-gray-400 dark:hover:text-gray-600"/>
                                </button>
                            </div>
                        ))}

                        <button type="button" onClick={addTag} className="mt-3 flex items-center gap-3 text-gray-500 hover:text-gray-400 dark:hover:text-gray-600">
                            <AiOutlinePlus />
                            <span>タグを追加</span>
                        </button>

                        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="コメント" className="h-24 resize-none mt-3 p-3 rounded-md border border-gray-400 dark:border-gray-600 bg-transparent placeholder:text-gray-500 w-full" />
                    </div>

                    <div className="mt-3 flex justify-end">
                        <SubmitButton text="作成" isLoading={isLoading} disabled={title === "" || title.length > titleMax || text === "" || text.length > commentTextMax} />
                    </div>
                </form>
            </div>
        </div>
    )
}