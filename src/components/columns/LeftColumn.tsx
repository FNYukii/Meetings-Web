import { NavLink } from 'react-router-dom'
import { FaHome, FaSearch } from 'react-icons/fa'

export default function LeftColumn() {
    
    return (
        <div className='border w-1/4'>
            <NavLink to='/' className="text-inherit no-underline p-2 text-2xl">Meetings</NavLink>

            <nav>
                <NavLink to='/' className="flex p-2 mr-2 hover:opacity-60">
                    <FaHome className='text-xl'/>
                    <span className='ml-1 text-lg'>ホーム</span>
                </NavLink>

                <NavLink to='/search' className="flex p-2 mr-2 hover:opacity-60">
                    <FaSearch className='text-xl'/>
                    <span className='ml-1 text-lg'>検索</span>
                </NavLink>

            </nav>
        </div>
    )
}