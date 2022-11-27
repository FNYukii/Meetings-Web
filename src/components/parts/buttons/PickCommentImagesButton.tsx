import { useRef } from "react"
import { AiOutlinePlus } from "react-icons/ai"

function PickCommentImagesButton(props: {setImage: React.Dispatch<React.SetStateAction<File | null>>, className?: string}) {

    const inputRef = useRef<HTMLInputElement>(null)

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!e.target.files) return

        // React.ChangeEvent<HTMLInputElement>よりファイルを取得
        const file = e.target.files[0]
        props.setImage(file)
    }

    return (
        <div className={`${props.className}`}>

            <button type="button" onClick={() => inputRef.current?.click()} className="flex items-center gap-3 text-gray-500 py-1 px-2 rounded-full transition hover:bg-zinc-100 dark:hover:bg-zinc-900">
                <AiOutlinePlus />
                <span>画像を追加</span>    
            </button>

            <input hidden ref={inputRef} type="file" accept=".jpg" onChange={onFileInputChange} className="mt-3" />
        </div>
    )
}

export default PickCommentImagesButton