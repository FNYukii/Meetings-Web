import { useEffect, useRef, useState } from "react"

function PickIconImageButton(props: { currentIconUrl: string | null, pickedIcon: File | null, setPickedIcon:React.Dispatch<React.SetStateAction<File | null>>, className?: string }) {

    const inputRef = useRef<HTMLInputElement>(null)
    const [iconObjectUrl, setIconObjectUrl] = useState<string | null>(null)

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!e.target.files) return

        // React.ChangeEvent<HTMLInputElement>よりファイルを取得
        const file = e.target.files[0]
        props.setPickedIcon(file)

        // オブジェクトURLを生成し
        const objectUrl = window.URL.createObjectURL(file)
        setIconObjectUrl(objectUrl)
    }

    useEffect(() => {

        return () => {

            if (iconObjectUrl) {
                URL.revokeObjectURL(iconObjectUrl);
            }
        }

        // eslint-disable-next-line
    }, [])

    return (
        <div className={`relative aspect-square w-16 ${props.className}`}>

            {!props.pickedIcon && !props.currentIconUrl &&
                <div className="bg-gray-200 dark:bg-gray-800 rounded-full absolute top-0 left-0 w-full h-full"></div>
            }

            {!props.pickedIcon && props.currentIconUrl &&
                <img src={props.currentIconUrl} alt="Icon" className="rounded-full absolute top-0 left-0 w-full h-full" />
            }

            {props.pickedIcon &&
                <img src={ iconObjectUrl! } alt="Icon" className="rounded-full absolute top-0 left-0 w-full h-full" />
            }

            <button onClick={() => inputRef.current?.click()}>
                <div className="absolute top-0 left-0 hover:bg-black/20 dark:hover:bg-white/20 transition w-full h-full rounded-full"></div>
            </button>

            <input hidden ref={inputRef} type="file" accept=".jpg,.png,.gif" onChange={onFileInputChange} className="mt-3" />
        </div>
    )
}

export default PickIconImageButton