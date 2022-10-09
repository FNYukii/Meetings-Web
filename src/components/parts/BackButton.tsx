import { FiArrowLeft } from "react-icons/fi"
import { useNavigate } from "react-router-dom"

export default function BackButton() {

    const navigate = useNavigate()

    return (
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-zinc-300/30 dark:hover:bg-zinc-700/70 rounded-full mr-4 z-10">
            <FiArrowLeft className="text-2xl" />
        </button>
    )
}