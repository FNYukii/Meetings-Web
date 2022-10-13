import { Link, useLocation } from "react-router-dom";
import Comment from "../../entities/Comment";

export default function CommentImageLink(props: { comment: Comment, imageIndex: number }) {

    const location = useLocation()

    return (
        <Link to={`/comments/${props.comment.id}/images/${props.imageIndex + 1}`} state={{ previousPath: location.pathname }} className="pointer-events-auto relative">

            <img src={props.comment.imageUrls[props.imageIndex]} alt="Attached to comment" className="rounded-xl w-full h-full object-cover border border-zinc-200 dark:border-zinc-800" />
            <div className="absolute top-0 left-0 hover:bg-black/10 dark:hover:bg-white/10 w-full h-full rounded-xl"></div>
        </Link>
    )
}