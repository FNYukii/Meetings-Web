import LeftColumn from './LeftColumn'
import CenterColumn from './CenterColumn'
import RightColumn from './RightColumn'

import { BrowserRouter } from 'react-router-dom'


export default function App() {
    
    return (
        <div className='container flex m-auto'>
            <BrowserRouter>
                <LeftColumn />
                <CenterColumn />
                <RightColumn />
            </BrowserRouter>
        </div>
    )
}