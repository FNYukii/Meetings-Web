import { NavLink } from "react-router-dom";
import Comment from "../../types/Comment";

export default function RecentImageSmallRow(props: { comment: Comment }) {

    return (
        <div className="w-full p-3 flex justify-between relative">

            <NavLink to={`/comments/${props.comment.id}`} className="absolute top-0 left-0 w-full h-full hover:bg-black/10" />

            <div>
                <p>{props.comment.text}</p>
            </div>

            <img src={props.comment.imageUrls[0]} alt="Attached to comment" className="w-20 h-20 object-cover rounded-xl border border-zinc-200 dark:border-zinc-800" />
        </div>
    )
}