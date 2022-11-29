import { useState } from "react"
import { AiOutlinePlus, AiOutlineTag } from "react-icons/ai"
import { MdOutlineClose } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import FireComments from "../../utilities/FireComments"
import FireImages from "../../utilities/FireImages"
import FireThreads from "../../utilities/FireThreads"
import PickCommentImagesButton from "../parts/buttons/PickCommentImagesButton"
import SubmitButton from "../parts/buttons/SubmitButton"
import DynamicTextarea from "../parts/inputs/DynamicTextarea"
import FormModal from "../parts/modals/FormModal"

function AddThreadModal() {

    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [tags, setTags] = useState<string[]>([])

    const [text, setText] = useState("")
    const [images, setImages] = useState<File[]>([])

    const [isUploading, setIsUploading] = useState(false)

    const titleMax = 50
    const tagsMax = 5
    const tagMax = 30
    const textMax = 300

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

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        addThread()
    }

    async function addThread() {
        
        setIsUploading(true)

        // スレッドを作成
        const threadId = await FireThreads.createThread(title, tags)

        // 失敗
        if (threadId === null) {

            setIsUploading(false)
            alert("スレッドの作成に失敗しました。")
            return
        }

        // 成功
        // 画像をアップロード
        const imageUrls = await FireImages.uploadImages(images, "images")

        // 失敗
        if (!imageUrls) {
            setIsUploading(false)
            alert("コメントの作成に失敗しました。")
            return
        }

        // 成功
        // コメントを作成
        await FireComments.createComment(threadId, text, imageUrls)
        navigate(-1)
    }

    return (
        <FormModal title="新規スレッド - Meetings">
            <form onSubmit={(e) => onSubmit(e)}>

                <div className="mt-3 px-3">

                    <p className="text-2xl font-bold">新しいスレッド</p>

                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="タイトル" className="mt-5 w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />

                    {tags.map((tag, index) => (

                        <div key={index} className="mt-3 flex items-center w-1/2">

                            <AiOutlineTag className="text-gray-500" />
                            <input type="text" onChange={(e) => editTag(index, e.target.value)} value={tags[index]} maxLength={tagMax} placeholder="タグ" className="ml-3 w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />

                            <button type="button" onClick={() => removeTag(index)} className="ml-1 p-2 rounded-full transition hover:bg-zinc-100 dark:hover:bg-zinc-900">
                                <MdOutlineClose className="text-xl text-gray-500" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="px-1">

                    <button type="button" onClick={addTag} disabled={tags.length >= tagsMax} className={`mt-3 flex items-center gap-3 text-gray-500 py-1 px-2 rounded-full transition hover:bg-zinc-100 dark:hover:bg-zinc-900 disabled:text-gray-400 disabled:dark:text-gray-600 disabled:hover:bg-transparent disabled:dark:hover:bg-transparent`}>
                        <AiOutlinePlus />
                        <span>タグを追加</span>
                    </button>
                </div>

                <div className="px-3">
                    <DynamicTextarea value={text} setValue={setText} placeholder="コメント" className="mt-3 w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                </div>

                <div className="mt-3 mx-3 flex flex-wrap gap-3">

                    {images.map((image) => (
                        <img src={window.URL.createObjectURL(image)} alt="Attached to comment" className="max-h-32 aspect-ratio rounded-xl" />
                    ))}
                </div>

                <div className="mt-3 flex justify-between">

                    <PickCommentImagesButton setImage={setImages} className="ml-1" />
                    <SubmitButton text="作成" isLoading={isUploading} disabled={title.length > titleMax || !title.match(/\S/g) || tags.length > tagsMax || (tags.filter(item => item.length === 0 || item.length > tagMax)).length > 0 || text.length > textMax || !text.match(/\S/g)} />
                </div>
            </form>
        </FormModal>
    )
}

export default AddThreadModal