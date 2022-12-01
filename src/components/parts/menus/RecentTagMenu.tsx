import { MenuItem } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import "@szhsin/react-menu/dist/theme-dark.css"
import { AiOutlineMeh } from 'react-icons/ai'
import PopupMenu from './PopupMenu'

function RecentTagMenu(props: { tag: string, removeTag: (tag: string) => void }) {

    return (
        <PopupMenu menuButtonClassName='hover:bg-zinc-200 dark:hover:bg-zinc-800'>
            <MenuItem>

                <button onClick={() => props.removeTag(props.tag)} className="flex items-center gap-3 ">

                    <AiOutlineMeh className='text-gray-500 text-xl' />
                    <span>興味なし</span>
                </button>
            </MenuItem>
        </PopupMenu>
    )
}

export default RecentTagMenu