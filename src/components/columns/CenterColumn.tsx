import { Routes, Route } from 'react-router-dom'

import HomeScreen from '../screens/HomeScreen'
import ThreadScreen from '../screens/ThreadScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import SearchScreen from '../screens/SearchScreen'

export default function CenterColumn() {

    return (
        <div className='md:w-2/4 w-2/3 border-l border-r border-zinc-200 dark:border-zinc-800'>
            <Routes>
                <Route path='/' element={<HomeScreen />} />
                <Route path='/search' element={<SearchScreen />} />
                <Route path='/threads/:threadId' element={<ThreadScreen />} />
                <Route path='*' element={<NotFoundScreen />} />
            </Routes>
        </div>
    )
}