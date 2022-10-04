import Thread from "../../types/Thread";
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import { VscEllipsis } from 'react-icons/vsc'
import '@szhsin/react-menu/dist/index.css';

export default function ThreadMenu(props: { thread: Thread }) {

    return (
        <div>
            <Menu menuButton={
                <MenuButton className="bg-transparent border-0">
                    <VscEllipsis className="text-xl text-gray-500"/>
                </MenuButton>
            } direction='right'>
                <MenuItem>スレッドを削除</MenuItem>
            </Menu>
        </div>
    )
}