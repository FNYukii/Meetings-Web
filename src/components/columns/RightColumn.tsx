import RecentTagsCard from "../parts/RecentTagsCard";

export default function RightColumn() {

    return (
        <div className='xl:w-1/4 md:w-4/12 md:block hidden'>

            <div className="sticky top-0 px-4 pt-2">
                
                <RecentTagsCard />

                <div className="mt-3 text-gray-500 text-sm flex flex-wrap gap-3">

                    <span>© <a href="https://github.com/Yu357" target="blank" className="hover:underline">Yu357</a> 2022.</span>
                    
                    <a href="https://github.com/Yu357/Meetings-Web" target="blank" className="hover:underline">Source</a>
                </div>
            </div>
        </div>
    )
}