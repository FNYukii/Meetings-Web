import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { FaHome, FaSearch } from 'react-icons/fa'

export default function LeftColumn() {

    const Root = styled.div`
        width: 25%;
        border: 1px solid gray;
    `

    return (
        <Root>
            <p>Side Bar</p>

            <nav>
                <div>
                    <FaHome/>
                    <NavLink to='/'>ホーム</NavLink>
                </div>

                <div>
                    <FaSearch/>
                    <NavLink to='/search'>検索</NavLink>
                </div>
            </nav>
        </Root>
    )
}