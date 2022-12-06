import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CloseButton from "../buttons/CloseButton"

function FormModal(props: { children: JSX.Element, title: string }) {

    const navigate = useNavigate()
    const body = document.body

    useEffect(() => {

        document.title = props.title
        document.addEventListener("keydown", onKeyDown, false)
        body.style.overflowY = "hidden"

        return () => {
            document.removeEventListener("keydown", onKeyDown, false)
            body.style.overflowY = ""
        }
        // eslint-disable-next-line
    }, [])
    
    const onKeyDown = (event: KeyboardEvent) => {

        if (event.key === "Escape") navigate(-1)
    }

    return (
        <div className="z-30 fixed top-0 left-0 w-full h-full flex justify-center items-center">

            <div onClick={() => navigate(-1)} className="w-full h-full bg-black/20 dark:bg-white/20"></div>

            <div className="absolute bg-white dark:bg-black p-6 rounded-xl md:width-600 w-11/12 max-height-screen-90 overflow-y-scroll">

                <CloseButton />

                {props.children}
            </div>
        </div>
    )
}

export default FormModal