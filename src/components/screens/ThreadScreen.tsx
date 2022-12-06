import { useParams } from "react-router-dom"
import BackButton from "../parts/buttons/BackButton"
import CommentsInThreadList from "../parts/lists/CommentsInThreadList"
import ThreadTitleSpan from "../parts/spans/ThreadTitleSpan"
import NewCommentLink from "../parts/links/NewCommentLink"

function ThreadScreen() {

    const { threadId } = useParams()

    return (
        <div>
            <div className='sticky top-0 z-20'>
                <div className='relative h-14 pl-1 pr-1 flex items-center justify-between bg-white/70 dark:bg-black/70 backdrop-blur'>

                    <div className='absolute top-0 left-0 w-full h-full cursor-pointer' onClick={() => window.scrollTo(0, 0)}></div>

                    <div className="flex items-center">

                        <BackButton />
                        <ThreadTitleSpan threadId={threadId!} className="ml-7" />
                    </div>

                    <NewCommentLink threadId={threadId!} />
                </div>
            </div>

            <CommentsInThreadList threadId={threadId!}/>
        </div>
    )
}

export default ThreadScreen