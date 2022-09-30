import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { FaHome, FaSearch } from 'react-icons/fa'

export default function LeftColumn() {

    const Root = styled.div`
        width: 25%;
        border: 1px solid gray;
    `

    const LogoNavLink = styled(NavLink)`
        color: inherit;
        text-decoration: none;
        font-size: x-large;
        padding: 8px;
    `
    
    const NavItemNavLink = styled(NavLink)`
        display: flex;
        justify-content: left;

        color: inherit;
        text-decoration: none;
        padding: 8px;
        border-radius: 32px;
        margin-right: 8px;

        &:hover {
            background-color: #333A;
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
        <Root>
            <LogoNavLink to='/'>Meetings</LogoNavLink>

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
        </Root>
    )
}