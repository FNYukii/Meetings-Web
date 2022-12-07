import TitleBar from "../parts/sections/TitleBar"

function NotFoundScreen() {

    document.title = "Not Found - Meetings"

    return (
        <div>
            <TitleBar showBackButton>
                <span className='ml-1 font-bold text-lg'>Not Found</span>
            </TitleBar>

            <div className="p-2">
                <p className="text-gray-500 text-center">ページが見つかりませんでした。</p>
            </div>
        </div>
    )
}

export default NotFoundScreen