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

            <nav>
                <div>
                    <NavLink to='/'>ホーム</NavLink>
                </div>

                <div>
                    <NavLink to='/search'>検索</NavLink>
                </div>
            </nav>
        </Root>
    )
}