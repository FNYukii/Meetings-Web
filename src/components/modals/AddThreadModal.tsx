import { useEffect, useState } from "react"
import { MdOutlineClose } from "react-icons/md"
import { useNavigate } from "react-router-dom"

export default function AddThreadModal() {

    const navigate = useNavigate()
    const body = document.body
    const [title, setTitle] = useState("")

    useEffect(() => {

        document.title = "新規コメント - Meetings"
        body.style.overflowY = "hidden"
        // eslint-disable-next-line
    }, [])

    function closeModal() {

        body.style.overflowY = ""
        navigate(-1)
    }

    return (
        <div className="z-30 fixed top-0 left-0 w-full h-full flex justify-center items-center">

            <div onClick={closeModal} className="w-full h-full bg-black/20 dark:bg-white/20"></div>

            <div className="absolute bg-white dark:bg-black p-6 rounded-xl md:width-600 w-11/12">

                <button onClick={closeModal} className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full">
                    <MdOutlineClose className="text-2xl text-gray-500" />
                </button>

                <div className="mt-3 px-3">

                    <p className="text-2xl font-bold">新しいスレッド</p>

                    <textarea value={title} onChange={(e) => setTitle(e.target.value)} placeholder="コメント" className="h-24 resize-none mt-3 p-3 rounded-md border border-gray-400 dark:border-gray-600 bg-transparent placeholder:text-gray-500 w-full" />
                </div>

                <div className="mt-3 flex justify-end">
                    <button disabled={title === ""} className={`font-bold p-3 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 ${title === "" ? "text-gray-400 dark:text-gray-600 hover:bg-transparent dark:hover:bg-transparent" : ""}`}>送信</button>
                </div>

                

            </div>
        </div>
    )
}