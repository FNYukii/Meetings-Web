import RecentTagsSection from "../parts/sections/RecentTagsSection";

export default function RightColumn(props: {className?: string}) {

    return (
        <div className={props.className}>

            <div className="sticky top-0 px-4 pt-2">
                
                <RecentTagsSection />

                <div className="mt-3 text-gray-500 text-sm flex flex-wrap gap-3">

                    <span>© <a href="https://github.com/FNYukii" target="blank" className="hover:underline">FNYukii</a> 2022.</span>
                    
                    <a href="https://github.com/FNYukii/Meetings-Web" target="blank" className="hover:underline">Source</a>
                </div>
            </div>
        </div>
    )
}