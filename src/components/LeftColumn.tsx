import styled from 'styled-components'

import { NavLink } from 'react-router-dom'

export default function LeftColumn() {

    const Root = styled.div`
        width: 25%;
        border: 1px solid gray;
    `

    return (
        <Root>
            <p>Side Bar</p>

            <ul>
                <li>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/search'>Search</NavLink>
                    <NavLink to='/notifications'>Notifications</NavLink>
                </li>
            </ul>
        </Root>
    )
}