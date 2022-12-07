import TitleBar from "../parts/sections/TitleBar"

function AccountScreen() {

    return (
        <div>
            <TitleBar showBackButton>
                <span className='ml-1 font-bold text-lg'>アカウント</span>
            </TitleBar>
        </div>
    )
}

export default AccountScreen