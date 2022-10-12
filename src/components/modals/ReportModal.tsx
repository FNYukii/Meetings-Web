import { useNavigate } from "react-router-dom"

export default function ReportModal(props: { className?: string }) {

    const navigate = useNavigate()

    const body = document.body
    body.style.overflowY = "hidden"

    function closeModal() {
        body.style.overflowY = ""
        
        navigate(-1)
    }

    return (
        <div className={`z-30 fixed top-0 left-0 w-full h-full flex justify-center items-center ${props.className}`}>

            <div className="w-full h-full bg-black/80" onClick={closeModal}></div>

            <div className="absolute bg-white p-3">
                <p>hello</p>
            </div>
        </div>
    )
}