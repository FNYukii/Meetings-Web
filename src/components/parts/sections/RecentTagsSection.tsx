import RecentTagsList from "../lists/RecentTagsList"

function RecentTagsSection() {

    return (
        <div className="bg-gray-100 dark:bg-gray-900 w-full min-h-96 rounded-xl py-3">
            <p className="font-bold text-lg mx-3">最近</p>

            <RecentTagsList />
        </div>
    )
}

export default RecentTagsSection