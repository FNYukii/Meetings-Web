import { useEffect } from "react"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { BsPerson } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import FireAuth from "../../utilities/FireAuth"
import SignOutButton from "../parts/buttons/SignOutButton"
import SettingsItemLink from "../parts/links/SettingsItemLink"

function SettingsScreen() {

    const navigate = useNavigate()

    useEffect(() => {

        // 非ログイン状態でこの画面にアクセスされたら、トップ画面へリダイレクト
        const uid = FireAuth.uid()
        if (!uid) {
            navigate('/')
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <div className='sticky top-0 z-20 mb-1'>
                <div className='relative h-14 pl-1 pr-3 flex items-center justify-between bg-white/70 dark:bg-black/70 backdrop-blur'>
                    <div className='absolute top-0 left-0 w-full h-full cursor-pointer' onClick={() => window.scrollTo(0, 0)}></div>

                    <div className="flex items-center">
                        <span className='font-bold text-lg ml-2'>設定</span>
                    </div>
                </div>
            </div>

            <SettingsItemLink title="アカウント情報" to="/settings/account">
                <BsPerson className="text-gray-500 text-2xl" />
            </SettingsItemLink>

            <SettingsItemLink title="ミュートしているユーザー" to="/settings/muted">
                <AiOutlineEyeInvisible className="text-gray-500 text-2xl" />
            </SettingsItemLink>

            <SignOutButton />
        </div>
    )
}

export default SettingsScreen