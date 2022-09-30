import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { FaHome, FaSearch } from 'react-icons/fa'

export default function LeftColumn() {

    const Root = styled.div`
        width: 25%;
        border: 1px solid gray;
    `

    const HomeIcon = styled(FaHome)`
        font-size: x-large;
    `

    const SearchIcon = styled(FaSearch)`
        font-size: x-large;
    `

    const NavItem = styled(NavLink)`
        font-size: large;
        color: inherit;
        text-decoration: none;
    `

    return (
        <Root>
            <p>Side Bar</p>

            <nav>
                <div>
                    <HomeIcon/>
                    <NavItem to='/'>ホーム</NavItem>
                </div>

                <div>
                    <SearchIcon/>
                    <NavItem to='/search'>検索</NavItem>
                </div>
            </nav>
        </Root>
    )
}