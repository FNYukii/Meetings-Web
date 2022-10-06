import Comment from "../../types/Comment"
import UserDisplayNameSpan from "./UserDisplayNameSpan"
import UserIconNavLink from "./UserIconNavLink"
import UserUserTagSpan from "./UserUserTagSpan"
import { NavLink } from "react-router-dom"

export default function CommentRow(props: {comment: Comment}) {
    return (
        <NavLink to="/" className="flex p-2 hover:bg-gray-400 hover:bg-opacity-10">
            <UserIconNavLink userId={props.comment.userId}/>

            <div className="pl-2 w-full">
                <div>
                    <UserDisplayNameSpan userId={props.comment.userId}/>
                    <UserUserTagSpan userId={props.comment.userId}/>
                </div>

                <div>
                    <p>{props.comment.text}</p>
                </div>
            </div>

        </NavLink>
    )
}