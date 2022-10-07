import Comment from "../../types/Comment"
import UserDisplayNameSpan from "./UserDisplayNameSpan"
import UserIconNavLink from "./UserIconNavLink"
import UserUserTagSpan from "./UserUserTagSpan"
import EditDate from "../../utilities/EditDate"
import { NavLink } from "react-router-dom"
import CommentMenu from "./CommentMenu"

export default function CommentRow(props: { comment: Comment }) {
    return (
        <div className="flex p-3 relative">

            <NavLink to={`/comments/${props.comment.id}`} className="absolute top-0 left-0 w-full h-full hover:bg-zinc-500/10 dark:hover:bg-zinc-500/20" />

            <UserIconNavLink userId={props.comment.userId} />

            <div className="pl-3 w-full">

                <div className="flex justify-between items-center">

                    <div>
                        <UserDisplayNameSpan userId={props.comment.userId} />

                        <span className="ml-3">
                            <UserUserTagSpan userId={props.comment.userId} />
                        </span>

                        <span className="text-gray-500 ml-3">{EditDate.howManyAgo(props.comment.createdAt)}</span>
                    </div>

                    <CommentMenu comment={props.comment} />
                </div>

                <div>
                    <p>{props.comment.text}</p>
                </div>

                <div className="flex gap-2">
                    {props.comment.imageUrls.map((url) => (
                        <img key={url} src={url} alt="Attached to comment" className="z-10 mt-2 rounded-xl" />
                    ))}
                </div>
            </div>
        </div>
    )
}