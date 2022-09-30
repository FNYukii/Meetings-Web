import LeftColumn from './LeftColumn'
import CenterColumn from './CenterColumn'
import RightColumn from './RightColumn'

import styled from 'styled-components'

export default function App() {

    const Root = styled.div`
        width: 1200px;
        margin: 0 auto;
        display: flex;
        
        @media(max-width: 1200px) {
            width: 100%;
        }
    `

    return (
        <Root>
            <LeftColumn />
            <CenterColumn />
            <RightColumn />
        </Root>
    )
}