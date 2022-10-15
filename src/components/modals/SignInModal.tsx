import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { MdOutlineClose } from "react-icons/md"
import SignInSection from "../parts/SignInSection"


export default function SignInModal() {

    const navigate = useNavigate()
    const body = document.body

    useEffect(() => {

        document.title = "サインイン - Meetings"
        body.style.overflowY = "hidden"
    })

    function closeModal() {

        body.style.overflowY = ""
        navigate(-1)
    }

    return (
        <div className="z-30 fixed top-0 left-0 w-full h-full flex justify-center items-center">

            <div onClick={closeModal} className="w-full h-full bg-black/20 dark:bg-white/20"></div>

            <div className="absolute bg-white dark:bg-black p-6 rounded-xl md:width-600 w-11/12">

                <button onClick={closeModal} className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full">
                    <MdOutlineClose className="text-2xl text-gray-500" />
                </button>

                <SignInSection/>
            </div>
        </div>
    )
}