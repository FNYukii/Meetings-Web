import { NavLink } from 'react-router-dom'
import { FaHome, FaSearch } from 'react-icons/fa'

export default function LeftColumn() {
    
    return (
        <div className='w-1/4'>
            <NavLink to='/' className="text-inherit no-underline p-2 text-4xl font-sans">Meetings</NavLink>

            <nav>
                <NavLink to='/' className="flex p-2 mr-2 mt-2 hover:opacity-60">
                    <FaHome className='text-2xl'/>
                    <span className='ml-2 text-xl'>ホーム</span>
                </NavLink>

                <NavLink to='/search' className="flex p-2 mr-2 hover:opacity-60">
                    <FaSearch className='text-2xl'/>
                    <span className='ml-2 text-xl'>検索</span>
                </NavLink>

            </nav>
        </div>
    )
}