import RecentTagsCard from "../parts/RecentTagsCard";

export default function RightColumn() {

    return (
        <div className='xl:w-1/4 md:w-4/12 md:block hidden'>
            <div className="sticky top-0 px-4 pt-2">
                <RecentTagsCard />
            </div>
        </div>
    )
}