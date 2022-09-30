import LeftColumn from './LeftColumn'
import CenterColumn from './CenterColumn'
import RightColumn from './RightColumn'

import styled from 'styled-components'

import { BrowserRouter } from 'react-router-dom'


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
            <BrowserRouter>
                <LeftColumn />
                <CenterColumn />
                <RightColumn />
            </BrowserRouter>
        </Root>
    )
}