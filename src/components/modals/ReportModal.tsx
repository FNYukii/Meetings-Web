import { useNavigate, useParams } from "react-router-dom"

export default function ReportModal(props: { className?: string }) {

    const navigate = useNavigate()

    const { collectionName, documentId } = useParams()

    const body = document.body
    body.style.overflowY = "hidden"

    function closeModal() {
        body.style.overflowY = ""
        
        navigate(-1)
    }

    return (
        <div className={`z-30 fixed top-0 left-0 w-full h-full flex justify-center items-center ${props.className}`}>

            <div className="w-full h-full bg-black/20 dark:bg-white/20" onClick={closeModal}></div>

            <div className="absolute bg-white p-3">
                <h1>Report</h1>
                <p>collection: {collectionName}</p>
                <p>documentId: {documentId}</p>
            </div>
        </div>
    )
}