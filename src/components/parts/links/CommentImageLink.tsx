import { FC } from "react"
import { Link, useLocation } from "react-router-dom"
import Comment from "../../../entities/Comment"

interface Props {
    comment: Comment
    imageIndex: number
}

const CommentImageLink: FC<Props> = ({comment, imageIndex}) => {
    
    const location = useLocation()

    return (
        <Link to={`/comments/${comment.id}/images/${imageIndex + 1}`} state={{ previousPath: location.pathname }} className="pointer-events-auto relative">

            <img src={comment.imageUrls[imageIndex]} alt="Attached to comment" className="rounded-xl w-full h-full object-cover border border-zinc-200 dark:border-zinc-800" />
            <div className="absolute top-0 left-0 hover:bg-black/10 dark:hover:bg-white/10 transition w-full h-full rounded-xl"></div>
        </Link>
    )
}

export default CommentImageLink