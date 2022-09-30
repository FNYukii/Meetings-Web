import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

export default function LeftColumn() {

    const Root = styled.div`
        width: 25%;
        border: 1px solid gray;
    `
    
    const StyledNavLink = styled(NavLink)`
        display: flex;
        justify-content: left;

        color: inherit;
        text-decoration: none;
        padding: 8px;
        border-radius: 32px;

        &:hover {
            background-color: #333A;
        }

        & *:first-child {
            font-size: x-large;
        }

        & *:last-child {
            font-size: large;
        }
    `

    return (
        <Root>
            <p>Side Bar</p>

            <nav>
                <StyledNavLink to='/'>
                    <FaHome />
                    <span>ホーム</span>
                </StyledNavLink>

            </nav>
        </Root>
    )
}