import BackButton from "../parts/buttons/BackButton"
import MutedUsersList from "../parts/lists/MutedusersList"

function MutedUsersScreen() {

    return (
        <div>

            <div className='sticky top-0 z-20'>
                <div className='relative h-14 pl-1 pr-3 flex items-center justify-between bg-white/70 dark:bg-black/70 backdrop-blur'>
                    <div className='absolute top-0 left-0 w-full h-full cursor-pointer' onClick={() => window.scrollTo(0, 0)}></div>

                    <div className="flex items-center">
                        <BackButton />
                        <span className='font-bold text-lg ml-7'>ミュート中のユーザー</span>
                    </div>
                </div>
            </div>

            <MutedUsersList/>
        </div>
    )
}

export default MutedUsersScreen