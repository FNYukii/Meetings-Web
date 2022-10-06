import { Routes, Route } from 'react-router-dom'

import HomeScreen from '../screens/HomeScreen'
import ThreadScreen from '../screens/ThreadScreen'
import NotFoundScreen from '../screens/NotFoundScreen'

export default function CenterColumn() {

    return (
        <div className='w-2/4 border'>
            <Routes>
                <Route path='/' element={<HomeScreen />} />
                <Route path='/threads/:id' element={<ThreadScreen />} />
                <Route path='*' element={<NotFoundScreen />} />
            </Routes>
        </div>
    )
}