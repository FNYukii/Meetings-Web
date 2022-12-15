import { MdOutlineClose } from "react-icons/md"

function SignOutDialog(props: {setIsShowDialog: React.Dispatch<React.SetStateAction<boolean>>}) {

    return (
        <div className="z-30 fixed top-0 left-0 w-full h-full flex justify-center items-center">

            <div onClick={() => props.setIsShowDialog(false)} className="w-full h-full bg-black/20 dark:bg-white/20"></div>

            <div className="absolute bg-white dark:bg-black p-6 rounded-xl sm:w-96 w-11/12 max-height-screen-90 overflow-y-scroll">

                <button onClick={() => props.setIsShowDialog(false)} className="p-3 transition hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full">
                    <MdOutlineClose className="text-2xl text-gray-500" />
                </button>

                <div className="px-3">
                    <p>サインアウトしてもよろしいですか?</p>
                </div>
            </div>
        </div>
    )
}

export default SignOutDialog