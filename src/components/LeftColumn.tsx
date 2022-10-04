import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { FaHome, FaSearch } from 'react-icons/fa'

export default function LeftColumn() {

    const NavItemNavLink = styled(NavLink)`
        display: flex;
        justify-content: left;

        color: inherit;
        text-decoration: none;
        padding: 8px;
        border-radius: 32px;
        margin-right: 8px;

        &:hover {
            background-color: #AAA3;
        }

        & *:first-child {
            font-size: x-large;
        }

        & *:last-child {
            margin-left: 4px;
            font-size: large;
        }
    `

    return (
        <div className='border w-1/4'>
            <NavLink to='/' className="text-inherit no-underline p-2 text-2xl">Meetings</NavLink>

            <nav>
                <NavItemNavLink to='/'>
                    <FaHome />
                    <span>ホーム</span>
                </NavItemNavLink>

                <NavItemNavLink to='/search'>
                    <FaSearch />
                    <span>検索</span>
                </NavItemNavLink>

            </nav>
        </div>
    )
}