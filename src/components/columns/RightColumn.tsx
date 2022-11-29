import MyBox from "../modals/Modal";
import RecentTagsCard from "../parts/sections/RecentTagsCard";

export default function RightColumn(props: {className?: string}) {

    return (
        <div className={props.className}>

            <div className="sticky top-0 px-4 pt-2">
                
                <RecentTagsCard />

                <div className="mt-3 text-gray-500 text-sm flex flex-wrap gap-3">

                    <span>© <a href="https://github.com/Yu357" target="blank" className="hover:underline">Yu357</a> 2022.</span>
                    
                    <a href="https://github.com/Yu357/Meetings-Web" target="blank" className="hover:underline">Source</a>

                    <MyBox className="text-xl">
                        <span>hello</span>
                    </MyBox>
                </div>
            </div>
        </div>
    )
}