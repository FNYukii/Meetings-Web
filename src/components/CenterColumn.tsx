import styled from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomeScreen from './screens/HomeScreen'
import ThreadScreen from './screens/ThreadScreen'

export default function CenterColumn() {

    const Root = styled.div`
        width: 50%;
        border: 1px solid gray;
    `

    return (
        <Root>
            <h1>center</h1>

            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomeScreen />} />
                    <Route path='/threads/:id' element={<ThreadScreen />} />
                </Routes>
            </BrowserRouter>
        </Root>
    )
}