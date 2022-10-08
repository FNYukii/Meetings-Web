import { NavLink } from 'react-router-dom'
import { AiOutlineHome, AiFillHome, AiOutlineLogin } from 'react-icons/ai'
import { HiSearch, HiOutlineSearch } from "react-icons/hi"

export default function LeftColumn() {

    return (
        <div className='xl:w-1/4 md:w-1/12'>
            <div className='sticky top-0'>
                <div className='xl:block xl:px-4 flex justify-end px-2 pt-1'>
                    <NavLink to='/' className="text-inherit no-underline p-2 text-3xl font-sans xl:block hidden">Meetings</NavLink>

                    <div>
                        <NavLink to='/' end className={({ isActive }) => `${isActive ? "font-bold" : ""}`}>
                            {({ isActive }) => (
                                <div className='flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2 mt-2 rounded-full'>
                                    <AiFillHome className={`text-3xl ${isActive ? "block": "hidden"}`}/>
                                    <AiOutlineHome className={`text-3xl ${isActive ? "hidden": "block"}`}/>
                                    <span className='ml-5 text-xl xl:block hidden'>ホーム</span>
                                </div>
                            )}
                        </NavLink>

                        <NavLink to='/search' className={({ isActive }) => `${isActive ? "font-bold" : ""}`}>
                            {({ isActive }) => (
                                <div className='flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2 mt-2 rounded-full'>
                                    <HiSearch className={`text-3xl ${isActive ? "block": "hidden"}`}/>
                                    <HiOutlineSearch className={`text-3xl ${isActive ? "hidden": "block"}`}/>
                                    <span className='ml-5 text-xl xl:block hidden'>検索</span>
                                </div>
                            )}
                        </NavLink>

                        <NavLink to='/sign-in' end className={({ isActive }) => `${isActive ? "" : ""}`}>
                            {({ isActive }) => (
                                <div className='flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-900 p-2 mt-2 rounded-full'>
                                    <AiOutlineLogin className={`text-3xl`}/>
                                    <span className='ml-5 text-xl xl:block hidden'>サインイン</span>
                                </div>
                            )}
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}