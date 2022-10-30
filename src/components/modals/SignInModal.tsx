import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { MdOutlineClose } from "react-icons/md"
import SignInSection from "../parts/sections/SignInSection"
import SignUpSection from "../parts/sections/SignUpSection"


export default function SignInModal() {

    const navigate = useNavigate()
    const body = document.body

    const [isShowSignUpSection, setIsShowSignUpSection] = useState(false)

    useEffect(() => {

        document.title = "サインイン - Meetings"
        document.addEventListener("keydown", onKeyDown, false)
        body.style.overflowY = "hidden"
        
        return () => {
            body.style.overflowY = ""
            document.removeEventListener("keydown", onKeyDown, false)
        }

        // eslint-disable-next-line
    }, [])

    const onKeyDown = (event: KeyboardEvent) => {

        if (event.key === "Escape") {
            navigate(-1)
        }
    }

    return (
        <div className="z-30 fixed top-0 left-0 w-full h-full flex justify-center items-center">

            <div onClick={() => navigate(-1)} className="w-full h-full bg-black/20 dark:bg-white/20"></div>

            <div className="absolute bg-white dark:bg-black p-6 rounded-xl md:width-600 w-11/12 max-height-screen-90">

                <button onClick={() => navigate(-1)} className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full">
                    <MdOutlineClose className="text-2xl text-gray-500" />
                </button>

                {!isShowSignUpSection &&
                    <SignInSection setIsShowSignUpSection={setIsShowSignUpSection}/>
                }

                {isShowSignUpSection &&
                    <SignUpSection setIsShowSignUpSection={setIsShowSignUpSection}/>
                }
            </div>
        </div>
    )
}