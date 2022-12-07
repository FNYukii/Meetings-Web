import BackButton from "../parts/buttons/BackButton"
import MutedUsersList from "../parts/lists/MutedusersList"
import TitleBar from "../parts/sections/TitleBar"

function MutedUsersScreen() {

    return (
        <div>
            <TitleBar>
                <BackButton className="ml-1" />
                <span className='ml-7 font-bold text-lg'>ミュートしているユーザー</span>
            </TitleBar>

            <MutedUsersList />
        </div>
    )
}

export default MutedUsersScreen