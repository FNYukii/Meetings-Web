import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import FireComments from "../../utilities/FireComments"
import FireImages from "../../utilities/FireImages"
import PickCommentImagesButton from "../parts/buttons/PickCommentImagesButton"
import SubmitButton from "../parts/buttons/SubmitButton"
import DynamicTextarea from "../parts/inputs/DynamicTextarea"
import FormModal from "../parts/modals/FormModal"

function AddCommentModal() {

    const { threadId } = useParams()
    const navigate = useNavigate()

    const [text, setText] = useState("")
    const [images, setImages] = useState<File[]>([])

    const [isUploading, setIsUploading] = useState(false)

    const textMax = 300

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        addComment()
    }

    async function addComment() {
        
        setIsUploading(true)

        // 画像をアップロード
        const imageUrls = await FireImages.uploadImages(images, "images")

        // 失敗
        if (!imageUrls) {
            alert("コメントの追加に失敗しました。")
            setIsUploading(false)
            return
        }
        
        // 成功
        // コメントを追加
        const commentId = await FireComments.createComment(threadId!, text, imageUrls)

        // 失敗
        if (commentId === null) {

            alert("コメントの追加に失敗しました。")
            setIsUploading(false)
            return
        }

        // 成功
        navigate(-1)
    }

    return (
        <FormModal title="新規コメント - Meetings">
            
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mt-3 px-3">

                    <p className="text-2xl font-bold">新しいコメント</p>

                    <DynamicTextarea value={text} setValue={setText} placeholder="コメント" className="mt-3 w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                </div>

                <div className="mt-3 mx-3 flex flex-wrap gap-3">

                    {images.map((image) => (
                        <img src={window.URL.createObjectURL(image)} alt="Attached to comment" className="max-h-32 aspect-ratio rounded-xl" />
                    ))}
                </div>

                <div className="mt-3 flex justify-between">

                    <PickCommentImagesButton setImage={setImages} className="ml-1" />
                    <SubmitButton text="追加" isLoading={isUploading} disabled={text === "" || text.length > textMax || !text.match(/\S/g)} />
                </div>
            </form>
        </FormModal>
    )
}

export default AddCommentModal