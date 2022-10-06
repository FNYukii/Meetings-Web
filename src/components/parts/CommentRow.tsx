import Comment from "../../types/Comment"
import UserDisplayNameSpan from "./UserDisplayNameSpan"
import UserIconNavLink from "./UserIconNavLink"
import UserUserTagSpan from "./UserUserTagSpan"

export default function CommentRow(props: {comment: Comment}) {
    return (
        <div className="flex p-2 hover:bg-gray-50">
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

        </div>
    )
}