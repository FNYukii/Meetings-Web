import { useNavigate, useParams } from "react-router-dom"

export default function ImageModal(props: {className?: string}) {

    const navigate = useNavigate()
    const { imageUrl } = useParams()

    return (
        <div className={`${props.className} z-30 fixed top-0 left-0 w-full h-full flex justify-center items-center`}>

            <div className="w-full h-full bg-black/30 dark:bg-white/20" onClick={() => navigate(-1)}></div>

            <div className="absolute">
                <div className="w-96 aspect-video p-3 bg-white dark:bg-black rounded-xl">
                    <h1>Modal</h1>
                    <p>imageUrl: {imageUrl!}</p>
                </div>
            </div>
        </div>
    )
}