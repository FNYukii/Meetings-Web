import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import { VscEllipsis } from 'react-icons/vsc'
import '@szhsin/react-menu/dist/index.css'
import "@szhsin/react-menu/dist/theme-dark.css"
import { useState } from "react"

export default function RecentTagMenu(props: { tag: string, setIsShow: React.Dispatch<React.SetStateAction<boolean>> }) {

    const [isDark, setIsDark] = useState(false)

    function checkTheme() {
        const isDark = matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;

        setIsDark(isDark)
    }

    function makeUninterested() {

        // 興味なしtagsをlocalStorageから取得
        let uninterestedTags: string[] = []
        const uninterestedTagsJson = localStorage.getItem('uninterestedTagsJson')

        if (uninterestedTagsJson === null) {
            uninterestedTags = []
        } else {
            uninterestedTags = JSON.parse(uninterestedTagsJson)
        }

        // 興味なしtagsにタグを追加
        uninterestedTags.push(props.tag)
        
        // 興味なしtagsをlocalStorageに追加
        localStorage.setItem('uninterestedTagsJson', JSON.stringify(uninterestedTags, undefined, 1))

        // RecentTagRowを非表示に
        props.setIsShow(false)
    }

    const menuButton = (
        <MenuButton className="hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full aspect-square flex items-center p-1" onClick={checkTheme}>
            <VscEllipsis className="z-10 text-xl text-gray-500" />
        </MenuButton>
    )

    return (
        <div>
            <Menu menuButton={menuButton} theming={isDark ? "dark" : undefined}>
                <MenuItem>
                    <button onClick={makeUninterested}>興味なし</button>
                </MenuItem>
            </Menu>
        </div>
    )
}