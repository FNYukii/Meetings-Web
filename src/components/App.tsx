import LeftColumn from './columns/LeftColumn'
import CenterColumn from './columns/CenterColumn'
import RightColumn from './columns/RightColumn'

import { BrowserRouter } from 'react-router-dom'


export default function App() {
    
    return (
        <div className='flex mx-auto large-container'>
            <BrowserRouter>
                <LeftColumn />
                <CenterColumn />
                <RightColumn />
            </BrowserRouter>
        </div>
    )
}