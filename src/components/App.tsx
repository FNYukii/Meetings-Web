import LeftColumn from './columns/LeftColumn'
import CenterColumn from './columns/CenterColumn'
import RightColumn from './columns/RightColumn'

import { BrowserRouter } from 'react-router-dom'


export default function App() {
    
    return (
        <div className='flex mx-auto xl:width-1280 w-full'>
            <BrowserRouter>
                <LeftColumn />
                <CenterColumn />
                <RightColumn />
            </BrowserRouter>
        </div>
    )
}