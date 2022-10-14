import { useNavigate } from "react-router-dom"
import { useEffect } from "react"


export default function SignInModal() {

    const navigate = useNavigate()
    const body = document.body

    function closeModal() {
        body.style.overflowY = ""
        navigate(-1)
    }

    useEffect(() => {
        document.title = "サインイン - Meetings"
        body.style.overflowY = "hidden"
    })

    return (
        <div className="z-30 fixed top-0 left-0 w-full h-full flex justify-center items-center">
            
            <div onClick={closeModal} className="w-full h-full bg-black/20 dark:bg-white/20"></div>

            <div className="absolute bg-white dark:bg-black p-6 rounded-xl md:width-600 w-11/12">
                <p>hello</p>
            </div>
        </div>
    )
}