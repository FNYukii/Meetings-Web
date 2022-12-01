import { useRef } from "react"
import { AiOutlinePlus } from "react-icons/ai"

function PickCommentImagesButton(props: {setImage: React.Dispatch<React.SetStateAction<File[]>>, className?: string}) {

    const inputRef = useRef<HTMLInputElement>(null)

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!e.target.files) return

        // 選択されたファイルを取得
        const fileList = e.target.files
        const files: File[] = Array.from(fileList)

        // 何も選択されていなかったら終了
        if (files.length === 0) return

        // 5番目以降の要素は配列から削除
        files.splice(4)

        props.setImage(files)
    }

    return (
        <div className={`${props.className}`}>

            <button type="button" onClick={() => inputRef.current?.click()} className="flex items-center gap-3 text-gray-500 py-1 px-2 rounded-full transition hover:bg-zinc-100 dark:hover:bg-zinc-900">
                <AiOutlinePlus />
                <span>画像を追加</span>    
            </button>

            <input hidden ref={inputRef} type="file" multiple accept=".jpg,.png" onChange={onFileInputChange} className="mt-3" />
        </div>
    )
}

export default PickCommentImagesButton