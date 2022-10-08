import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Comment from "../../types/Comment"
import FireComment from "../../utilities/FireComment"

export default function CommentScreen() {

    document.title = "コメント - Meetings"

    const { commentId } = useParams()
    const [comment, setComment] = useState<Comment | null>(null)

    async function readComment() {
        const comment = await FireComment.readCommentFromCache(commentId!)
        setComment(comment)
    }

    useEffect(() => {
        readComment()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <p>{comment?.text ?? ""}</p>
        </div>
    )
}