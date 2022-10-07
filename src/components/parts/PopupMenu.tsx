import { useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import { VscEllipsis } from 'react-icons/vsc'

export default function PopupMenu() {

    const [isPopup, setIsPopup] = useState(false)

    return (
        <div className='z-10'>
            <button onClick={() => setIsPopup(true)} className="flex items-center rounded-full p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800">
                <VscEllipsis className="text-xl text-gray-500"/>
            </button>

            {isPopup &&
                <ClickAwayListener onClickAway={() => setIsPopup(false)} className="z-30 top-0 left-0">
                    <div>
                        <button>Delete thread</button>
                    </div>
                </ClickAwayListener>
            }
        </div>
    )
}