import { FiArrowLeft } from "react-icons/fi"
import { useNavigate } from "react-router-dom"

export default function BackButton() {

    const navigate = useNavigate()

    return (
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full mr-3 z-10">
            <FiArrowLeft className="text-2xl" />
        </button>
    )
}