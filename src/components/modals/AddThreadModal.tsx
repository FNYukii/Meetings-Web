import { useEffect, useState } from "react"
import { AiOutlinePlus, AiOutlineTag } from "react-icons/ai"
import { MdOutlineClose } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import FireComments from "../../utilities/FireComments"
import FireThreads from "../../utilities/FireThreads"
import SubmitButton from "../parts/buttons/SubmitButton"
import DynamicTextarea from "../parts/inputs/DynamicTextarea"

export default function AddThreadModal() {

    const navigate = useNavigate()
    const body = document.body

    const [title, setTitle] = useState("")
    const [tags, setTags] = useState<string[]>([])
    const [text, setText] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const titleMax = 50
    const tagsMax = 5
    const tagMax = 30
    const textMax = 300

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
        setTags([...tags, ""])
    }

    function editTag(index: number, tag: string) {
        setTags(
            tags.map((t, i) => (i === index ? tag : t))
        )
    }

    function removeTag(index: number) {
        setTags(
            tags.filter((tag, i) => (i !== index))
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
        const threadId = await FireThreads.createThread(title, tags)

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

            <div className="absolute bg-white dark:bg-black p-6 rounded-xl md:width-600 w-11/12 max-height-screen-90">

                <button onClick={() => navigate(-1)} className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full">
                    <MdOutlineClose className="text-2xl text-gray-500" />
                </button>

                <form onSubmit={(e) => onSubmit(e)}>

                    <div className="mt-3 px-3">

                        <p className="text-2xl font-bold">新しいスレッド</p>

                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="タイトル" className="mt-5 w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />

                        {tags.map((tag, index) => (

                            <div key={index} className="mt-3 flex items-center w-1/2">

                                <AiOutlineTag className="text-gray-500" />
                                <input type="text" onChange={(e) => editTag(index, e.target.value)} value={tags[index]} maxLength={tagMax} placeholder="タグ" className="ml-3 w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />

                                <button type="button" onClick={() => removeTag(index)} className="ml-1 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900">
                                    <MdOutlineClose className="text-xl text-gray-500" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="px-1">

                        <button type="button" onClick={addTag} disabled={tags.length >= tagsMax} className={`mt-3 flex items-center gap-3 text-gray-500 py-1 px-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900    disabled:text-gray-400  disabled:dark:text-gray-600 disabled:hover:bg-transparent disabled:dark:hover:bg-transparent`}>
                            <AiOutlinePlus />
                            <span>タグを追加</span>
                        </button>
                    </div>

                    <div className="px-3">
                        <DynamicTextarea value={text} setValue={setText} placeholder="コメント" className="mt-3 w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                    </div>

                    <div className="mt-3 flex justify-end">
                        <SubmitButton text="作成" isLoading={isLoading} disabled={title.length > titleMax || !title.match(/\S/g) || tags.length > tagsMax || (tags.filter(item => item.length === 0 || item.length > tagMax)).length > 0 || text.length > textMax || !text.match(/\S/g)} />
                    </div>
                </form>
            </div>
        </div>
    )
}