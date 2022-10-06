import { NavLink } from 'react-router-dom'
import { FaHome, FaSearch } from 'react-icons/fa'

export default function LeftColumn() {
    
    return (
        <div className='w-1/4'>
            <NavLink to='/' className="text-inherit no-underline p-2 text-4xl font-sans">Meetings</NavLink>

            <nav className='mt-2'>
                <NavLink to='/' className="flex p-2 mr-2 mt-1 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full">
                    <FaHome className='text-2xl'/>
                    <span className='ml-3 text-xl'>ホーム</span>
                </NavLink>

                <NavLink to='/search' className="flex p-2 mr-2 mt-1 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full">
                    <FaSearch className='text-2xl'/>
                    <span className='ml-3 text-xl'>検索</span>
                </NavLink>

            </nav>
        </div>
    )
}