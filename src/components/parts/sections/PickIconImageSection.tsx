import { useRef, useState } from "react"

function PickIconImageSection(props: {className?: string}) {

    const [iconImage, setIconImage] = useState<string | null>(null)

    const inputRef = useRef<HTMLInputElement>(null)

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!e.target.files) return

        // React.ChangeEvent<HTMLInputElement>よりファイルを取得
        const fileObject = e.target.files[0]
        // オブジェクトURLを生成し、useState()を更新
        setIconImage(window.URL.createObjectURL(fileObject))
    }

    return (
        <div className={props.className}>

            <div className="relative aspect-square w-16">

                <div className="bg-zinc-200 dark:bg-zinc-800 rounded-full absolute top-0 left-0 w-full h-full"></div>

                {iconImage &&
                    <img src={iconImage} alt="Icon" className="rounded-full absolute top-0 left-0 w-full h-full" />
                }
            </div>

            <button onClick={() => inputRef.current?.click()} className="mt-3 py-1 px-3 bg-blue-500 rounded-md text-white hover:opacity-90">画像を選択</button>

            <input ref={inputRef} hidden type="file" accept="image/*" onChange={onFileInputChange} className="mt-3"/>
        </div>
    )
}

export default PickIconImageSection