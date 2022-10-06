import { Routes, Route } from 'react-router-dom'

import HomeScreen from '../screens/HomeScreen'
import ThreadScreen from '../screens/ThreadScreen'
import NotFoundScreen from '../screens/NotFoundScreen'

export default function CenterColumn() {

    return (
        <div className='w-2/4 border-l border-r border-gray-400 border-opacity-30'>
            <Routes>
                <Route path='/' element={<HomeScreen />} />
                <Route path='/threads/:threadId' element={<ThreadScreen />} />
                <Route path='*' element={<NotFoundScreen />} />
            </Routes>
        </div>
    )
}