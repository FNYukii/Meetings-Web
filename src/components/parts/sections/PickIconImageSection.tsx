import { useRef, useState } from "react"

function PickIconImageSection(props: { className?: string }) {

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

            <button onClick={() => inputRef.current?.click()}>
                <div className="relative aspect-square w-16">

                    {!iconImage &&
                        <div className="bg-zinc-200 dark:bg-zinc-800 rounded-full absolute top-0 left-0 w-full h-full"></div>
                    }

                    {iconImage &&
                        <img src={iconImage} alt="Icon" className="rounded-full absolute top-0 left-0 w-full h-full" />
                    }

                    <div className="absolute top-0 left-0 hover:bg-black/20 dark:hover:bg-white/20 transition w-full h-full rounded-full"></div>
                </div>
            </button>

            <input hidden ref={inputRef} type="file" accept="image/*" onChange={onFileInputChange} className="mt-3" />
        </div>
    )
}

export default PickIconImageSection