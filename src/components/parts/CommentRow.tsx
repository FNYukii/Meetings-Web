import Comment from "../../types/Comment"
import UserDisplayNameSpan from "./UserDisplayNameSpan"
import UserIconNavLink from "./UserIconNavLink"
import UserUserTagSpan from "./UserUserTagSpan"
import { NavLink } from "react-router-dom"
import EditDate from "../../utilities/EditDate"

export default function CommentRow(props: {comment: Comment}) {
    return (
        <NavLink to="/" className="flex p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900">
            <UserIconNavLink userId={props.comment.userId}/>

            <div className="pl-3 w-full">
                <div>
                    <UserDisplayNameSpan userId={props.comment.userId}/>

                    <span className="ml-3">
                        <UserUserTagSpan userId={props.comment.userId}/>
                    </span>

                    <span className="text-gray-500 ml-3">{EditDate.howManyAgo(props.comment.createdAt)}</span>
                </div>

                <div>
                    <p>{props.comment.text}</p>
                </div>
            </div>

        </NavLink>
    )
}