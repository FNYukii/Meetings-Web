import { useParams } from "react-router-dom"
import CommentsInThreadList from "../parts/lists/CommentsInThreadList"
import ThreadTitleSpan from "../parts/spans/ThreadTitleSpan"
import NewCommentLink from "../parts/links/NewCommentLink"
import TitleBar from "../parts/sections/TitleBar"

function ThreadScreen() {

    const { threadId } = useParams()

    return (
        <div>
            <TitleBar justifyBetween showBackButton>

                <ThreadTitleSpan threadId={threadId!} className="ml-7" />
                <NewCommentLink threadId={threadId!} className="mr-1" />
            </TitleBar>

            <CommentsInThreadList threadId={threadId!} />
        </div>
    )
}

export default ThreadScreen