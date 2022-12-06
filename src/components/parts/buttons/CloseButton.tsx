import { MdOutlineClose } from "react-icons/md"
import { useNavigate } from "react-router-dom"

function CloseButton() {

    const navigate = useNavigate()

    return (
        <button onClick={() => navigate(-1)} className="p-3 transition hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full">
            <MdOutlineClose className="text-2xl text-gray-500" />
        </button>
    )
}

export default CloseButton