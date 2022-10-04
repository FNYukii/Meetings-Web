import Thread from "../../types/Thread";
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import { FaEllipsisH } from 'react-icons/fa'
import '@szhsin/react-menu/dist/index.css';
import styled from "styled-components";


export default function ThreadMenu(props: { thread: Thread }) {

    const StyledMenuButton = styled(MenuButton)`
        background-color: transparent;
        border: none;
        cursor: pointer;
        
        border-radius: 50%;
        color: gray;
        padding: 4px;
    `

    return (
        <Menu menuButton={<StyledMenuButton><FaEllipsisH/></StyledMenuButton>} direction='left'>
            <MenuItem>スレッドを削除</MenuItem>
        </Menu>
    )
}