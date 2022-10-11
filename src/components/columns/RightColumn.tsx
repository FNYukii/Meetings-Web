import { Link, useLocation } from "react-router-dom";
import RecentTagsCard from "../parts/RecentTagsCard";

export default function RightColumn() {

    const location = useLocation()

    return (
        <div className='xl:w-1/4 md:w-4/12 md:block hidden'>

            <div className="sticky top-0 px-4 pt-2">
                
                <RecentTagsCard />

                <p className="mt-3 text-gray-500 text-sm flex gap-3">

                    <span>Copyright <a href="https://github.com/Yu357" target="blank" className="hover:underline">Yu357</a> 2022.</span>
                    <a href="https://github.com/Yu357/Meetings-Web" target="blank" className="hover:underline">Source code</a>

                    <Link to="/images/fdaglkajlkjl" state={{ previousPath: location.pathname }}>Modal</Link>
                </p>
            </div>
        </div>
    )
}