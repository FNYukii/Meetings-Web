import { AiOutlineArrowLeft } from "react-icons/ai"
import { useNavigate } from "react-router-dom"

export default function TitleBar(props: { text: string }) {

    const navigate = useNavigate()

    return (
        <div className='p-2 sticky top-0 bg-white/70 dark:bg-black/70 z-20 backdrop-blur mb-1 flex items-center'>

            <button onClick={() => navigate(-1)} className="p-2 text-xl hover:bg-zinc-100 rounded-full">
                <AiOutlineArrowLeft />
            </button>

            <span className='font-bold text-lg ml-2'>{props.text}</span>
        </div>
    )
}