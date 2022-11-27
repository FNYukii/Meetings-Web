import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import FireComments from "../../utilities/FireComments"
import CloseButton from "../parts/buttons/CloseButton"
import SubmitButton from "../parts/buttons/SubmitButton"
import DynamicTextarea from "../parts/inputs/DynamicTextarea"
 
function AddCommentModal() {

    const { threadId } = useParams()
    const navigate = useNavigate()
    const body = document.body

    const [text, setText] = useState("")
    const [isSubmited, setIsSubmited] = useState(false)

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

            <div className="absolute bg-white dark:bg-black p-6 rounded-xl md:width-600 w-11/12 max-height-screen-90">

                <CloseButton />

                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="mt-3 px-3">

                        <p className="text-2xl font-bold">新しいコメント</p>

                        <DynamicTextarea value={text} setValue={setText} placeholder="コメント" className="mt-3 w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                    </div>

                    <div className="mt-3 flex justify-end">
                        <SubmitButton text="追加" isLoading={isSubmited} disabled={text === "" || text.length > textMax || !text.match(/\S/g)} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCommentModal