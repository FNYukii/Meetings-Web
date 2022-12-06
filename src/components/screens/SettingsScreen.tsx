import { AiOutlineEyeInvisible } from "react-icons/ai"
import { IoIosArrowForward } from "react-icons/io"
import { NavLink } from "react-router-dom"
import SignOutButton from "../parts/buttons/SignOutButton"

function SettingsScreen() {

    return (
        <div>
            <div className='sticky top-0 z-20 mb-1'>
                <div className='relative h-14 pl-1 pr-3 flex items-center justify-between bg-white/70 dark:bg-black/70 backdrop-blur'>
                    <div className='absolute top-0 left-0 w-full h-full cursor-pointer' onClick={() => window.scrollTo(0, 0)}></div>

                    <div className="flex items-center">
                        <span className='font-bold text-lg ml-2'>設定</span>
                    </div>
                </div>
            </div>

            <NavLink to="/settings/muted">

                <div className="p-3 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-900">

                    <div className="flex gap-3 items-center">
                        <AiOutlineEyeInvisible className="text-gray-500 text-2xl" />
                        <span>ミュートしているユーザー</span>
                    </div>

                    <IoIosArrowForward className="text-gray-500 text-1xl" />
                </div>
            </NavLink>

            <SignOutButton/>
        </div>
    )
}

export default SettingsScreen