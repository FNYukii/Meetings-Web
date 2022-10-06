import { NavLink } from 'react-router-dom'
import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai'

export default function LeftColumn() {
    
    return (
        <div className='w-1/4'>
            <NavLink to='/' className="text-inherit no-underline p-2 text-3xl font-sans">Meetings</NavLink>

            <nav className='mt-2'>
                <NavLink to='/' className="flex p-2 mr-2 mt-1 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full items-center">
                    <AiOutlineHome className='text-3xl'/>
                    <span className='ml-3 text-xl'>ホーム</span>
                </NavLink>

                <NavLink to='/search' className="flex p-2 mr-2 mt-1 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full items-center">
                    <AiOutlineSearch className='text-3xl'/>
                    <span className='ml-3 text-xl'>検索</span>
                </NavLink>

            </nav>
        </div>
    )
}