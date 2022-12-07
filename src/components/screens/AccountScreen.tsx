import { AiOutlineMail } from "react-icons/ai"
import SignOutButton from "../parts/buttons/SignOutButton"
import SettingsItemLink from "../parts/links/SettingsItemLink"
import TitleBar from "../parts/sections/TitleBar"

function AccountScreen() {

    return (
        <div>
            <TitleBar showBackButton>
                <span className='ml-1 font-bold text-lg'>アカウント</span>
            </TitleBar>

            <SettingsItemLink title="メールアドレス" subTitle="xxx.xxxxx.xx@gmail.com" to="/settings/account/email">
                <AiOutlineMail className="text-gray-500 text-2xl" />
            </SettingsItemLink>

            <SignOutButton />
        </div>
    )
}

export default AccountScreen