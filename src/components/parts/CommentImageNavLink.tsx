import { Link, useLocation } from "react-router-dom";
import Comment from "../../types/Comment";

export default function CommentImageNavLink(props: { comment: Comment, imageIndex: number }) {

    const location = useLocation()

    return (
        <Link to={`/comments/${props.comment.id}/images/${props.imageIndex + 1}`} state={{ previousPath: location.pathname }} className="hover:opacity-80">
            <img src={props.comment.imageUrls[props.imageIndex]} alt="Attached to comment" className="rounded-xl w-full h-full object-cover border border-zinc-200 dark:border-zinc-800" />
        </Link>
    )
}