import { useEffect, useState } from "react"
import { AiOutlineMail } from "react-icons/ai"
import FireAuth from "../../utilities/FireAuth"
import SignOutButton from "../parts/buttons/SignOutButton"
import SettingsItemLink from "../parts/links/SettingsItemLink"
import TitleBar from "../parts/sections/TitleBar"

function AccountScreen() {

    const [email, setEmail] = useState<string | null>(null)

    useEffect(() => {

        const email = FireAuth.email()
        setEmail(email)
    }, [])

    return (
        <div>
            <TitleBar showBackButton>
                <span className='ml-1 font-bold text-lg'>アカウント</span>
            </TitleBar>

            <SettingsItemLink title="メールアドレスを変更" subTitle={email ?? ""} to="/settings/account/email">
                <AiOutlineMail className="text-gray-500 text-2xl" />
            </SettingsItemLink>

            <SettingsItemLink title="パスワードを変更" to="/settings/account/password">
                <AiOutlineMail className="text-gray-500 text-2xl" />
            </SettingsItemLink>

            <SignOutButton />
        </div>
    )
}

export default AccountScreen