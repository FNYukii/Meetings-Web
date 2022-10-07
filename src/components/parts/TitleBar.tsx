import { FiArrowLeft } from "react-icons/fi"
import { useNavigate } from "react-router-dom"

export default function TitleBar(props: { text: string, isShowBackButton: boolean }) {

    const navigate = useNavigate()

    return (
        <div className='p-2 sticky top-0 bg-white/70 dark:bg-black/70 z-20 backdrop-blur mb-1 flex items-center border-b'>
            
            {props.isShowBackButton &&
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full">
                    <FiArrowLeft className="text-2xl"/>
                </button>
            }

            <span className='font-bold text-lg ml-2'>{props.text}</span>
        </div>
    )
}