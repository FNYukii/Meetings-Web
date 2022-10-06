import { NavLink } from 'react-router-dom'
import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai'

export default function LeftColumn() {
    
    return (
        <div className='xl:w-1/4 md:w-1/12 w-2/12'>
            <NavLink to='/' className="text-inherit no-underline p-2 text-3xl font-sans xl:block hidden">Meetings</NavLink>
            <NavLink to='/' className="text-inherit no-underline p-2 text-3xl font-sans xl:hidden">M</NavLink>

            <div className='mt-2'>
                <NavLink to='/' className="flex p-2 mr-2 mt-1 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full items-center">
                    <AiOutlineHome className='text-3xl'/>
                    <span className='ml-3 text-xl xl:block hidden'>ホーム</span>
                </NavLink>

                <NavLink to='/search' className="flex p-2 mr-2 mt-1 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full items-center">
                    <AiOutlineSearch className='text-3xl'/>
                    <span className='ml-3 text-xl xl:block hidden'>検索</span>
                </NavLink>

            </div>
        </div>
    )
}