import { useParams } from "react-router-dom"
import BackButton from "../parts/buttons/BackButton"
import CommentsInThreadList from "../parts/lists/CommentsInThreadList"
import ThreadTitleSpan from "../parts/spans/ThreadTitleSpan"
import NewCommentLink from "../parts/links/NewCommentLink"
import TitleBar from "../parts/sections/TitleBar"

function ThreadScreen() {

    const { threadId } = useParams()

    return (
        <div>
            <TitleBar justifyBetween>

                <div className="flex items-center">
                    <BackButton className="ml-1"/>

                    <ThreadTitleSpan threadId={threadId!} className="ml-7"/>
                </div>

                <NewCommentLink threadId={threadId!} className="mr-1" />
            </TitleBar>

            <CommentsInThreadList threadId={threadId!}/>
        </div>
    )
}

export default ThreadScreen