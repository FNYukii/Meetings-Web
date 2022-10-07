import { FiArrowLeft } from "react-icons/fi"
import { useNavigate } from "react-router-dom"

export default function TitleBar(props: { text: string, isShowBackButton: boolean }) {

    const navigate = useNavigate()

    return (
        <div className='sticky top-0 bg-white/70 dark:bg-black/70 z-20 backdrop-blur mb-1 flex items-center h-14 px-3'>

            {props.isShowBackButton &&
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full mr-3">
                    <FiArrowLeft className="text-2xl"/>
                </button>
            }

            <span className='font-bold text-lg'>{props.text}</span>
        </div>
    )
}