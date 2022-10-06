import TitleBar from "../parts/TitleBar"

export default function NotFoundScreen() {

    document.title = "Not Found - Meetings"

    return (
        <div>
            <TitleBar text="Not Found"/>

            <div className="p-2">
                <p className="text-gray-500 text-center">ページが見つかりませんでした。</p>
            </div>
        </div>
    )
}