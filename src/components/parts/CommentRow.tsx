import Comment from "../../types/Comment"
import UserDisplayNameSpan from "./UserDisplayNameSpan"
import UserIconNavLink from "./UserIconNavLink"
import UserUserTagSpan from "./UserUserTagSpan"
import EditDate from "../../utilities/EditDate"
import { NavLink } from "react-router-dom"

export default function CommentRow(props: { comment: Comment }) {
    return (
        <div className="flex p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 relative">

            <NavLink to={`/comments/${props.comment.id}`} className="absolute top-0 left-0 w-full h-full z-0" />


            <UserIconNavLink userId={props.comment.userId} />

            <div className="pl-3 w-full">
                <div>
                    <UserDisplayNameSpan userId={props.comment.userId} />

                    <span className="ml-3">
                        <UserUserTagSpan userId={props.comment.userId} />
                    </span>

                    <span className="text-gray-500 ml-3">{EditDate.howManyAgo(props.comment.createdAt)}</span>
                </div>

                <div>
                    <p>{props.comment.text}</p>
                </div>
            </div>

        </div>
    )
}