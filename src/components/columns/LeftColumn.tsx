import { NavLink } from 'react-router-dom'
import { AiOutlineHome, AiFillHome, AiOutlineLogin } from 'react-icons/ai'
import { HiSearch, HiOutlineSearch } from "react-icons/hi"

export default function LeftColumn() {

    return (
        <div className='xl:w-1/4 md:w-1/12'>

            <div className='sticky top-0'>

                <div className='xl:block xl:px-4 flex justify-end px-2 pt-1'>

                    <NavLink to='/' className="text-inherit no-underline w-fit p-2 text-3xl font-sans xl:block hidden" onClick={() => window.scrollTo(0, 0)}>Meetings</NavLink>

                    <div>

                        <NavLink to='/' end className="block mt-2 rounded-full" onClick={() => window.scrollTo(0, 0)}>

                            {({ isActive }) => (

                                <div className='flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-800 p-2 rounded-full'>

                                    <AiFillHome className={`text-3xl ${isActive ? "block": "hidden"}`}/>
                                    <AiOutlineHome className={`text-3xl ${isActive ? "hidden": "block"}`}/>
                                    <span className={`ml-5 text-xl xl:block hidden ${isActive ? "font-bold" : ""}`}>ホーム</span>
                                </div>
                            )}
                        </NavLink>

                        <NavLink to='/search' className="block mt-2 rounded-full" onClick={() => window.scrollTo(0, 0)}>
                            
                            {({ isActive }) => (

                                <div className='flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-800 p-2 rounded-full'>

                                    <HiSearch className={`text-3xl ${isActive ? "block": "hidden"}`}/>
                                    <HiOutlineSearch className={`text-3xl ${isActive ? "hidden": "block"}`}/>
                                    <span className={`ml-5 text-xl xl:block hidden ${isActive ? "font-bold" : ""}`}>検索</span>
                                </div>
                            )}
                        </NavLink>

                        <NavLink to='/sign-in' end className="block mt-2 rounded-full" onClick={() => window.scrollTo(0, 0)}>

                            {({ isActive }) => (
                                
                                <div className='flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-800 p-2 rounded-full'>

                                    <AiOutlineLogin className={`text-3xl`}/>
                                    <span className={`ml-5 text-xl xl:block hidden ${isActive ? "" : ""}`}>サインイン</span>
                                </div>
                            )}
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}