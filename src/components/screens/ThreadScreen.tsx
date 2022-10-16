import { Link, useLocation, useParams } from "react-router-dom"
import BackButton from "../parts/buttons/BackButton"
import { AiOutlinePlus } from "react-icons/ai"
import CommentsInThreadList from "../parts/lists/CommentsInThreadList"
import ThreadTitleSpan from "../parts/spans/ThreadTitleSpan"

export default function ThreadScreen() {

    const location = useLocation()
    const { threadId } = useParams()

    return (
        <div>
            <div className='sticky top-0 z-20'>
                <div className='relative h-14 pl-1 pr-1 flex items-center justify-between bg-white/70 dark:bg-black/70 backdrop-blur'>

                    <div className='absolute top-0 left-0 w-full h-full cursor-pointer' onClick={() => window.scrollTo(0, 0)}></div>

                    <div className="flex items-center">

                        <BackButton />
                        <ThreadTitleSpan threadId={threadId!} />
                    </div>

                    <Link to={`/threads/${threadId}/new`} state={{ previousPath: location.pathname }} className="z-10 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900">
                        <AiOutlinePlus className="text-2xl" />
                    </Link>
                </div>
            </div>

            <CommentsInThreadList threadId={threadId!}/>
        </div>
    )
}