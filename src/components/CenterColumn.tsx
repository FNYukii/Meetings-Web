import styled from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomeScreen from './screens/HomeScreen'
import ThreadScreen from './screens/ThreadScreen'
import NotFoundScreen from './screens/NotFoundScreen'

export default function CenterColumn() {

    const Root = styled.div`
        width: 50%;
        border: 1px solid gray;
    `

    return (
        <Root>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomeScreen />} />
                    <Route path='/threads/:id' element={<ThreadScreen />} />
                    <Route path='*' element={<NotFoundScreen />} />
                </Routes>
            </BrowserRouter>
        </Root>
    )
}