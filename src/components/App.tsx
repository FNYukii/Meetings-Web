import LeftColumn from './columns/LeftColumn'
import CenterColumn from './columns/CenterColumn'
import RightColumn from './columns/RightColumn'

import { BrowserRouter } from 'react-router-dom'


export default function App() {
    
    return (
        <div className='flex mx-auto xl:width-1280 w-full'>
            <BrowserRouter>
                <LeftColumn className='xl:w-1/4 md:w-1/12'/>
                <CenterColumn className='xl:w-2/4 md:w-7/12 w-full'/>
                <RightColumn className='xl:w-1/4 md:w-4/12 md:block hidden'/>
            </BrowserRouter>
        </div>
    )
}