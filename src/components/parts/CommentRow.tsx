import Comment from "../../types/Comment"
import UserDisplayNameSpan from "./UserDisplayNameSpan"
import UserIconNavLink from "./UserIconNavLink"
import UserUserTagSpan from "./UserUserTagSpan"
import EditDate from "../../utilities/EditDate"
import { NavLink } from "react-router-dom"
import CommentMenu from "./CommentMenu"
import CommentImagesGrid from "./CommentImagesGrid"
import CommentThreadTitle from "./CommentThreadTitle"
import CommentReactionRow from "./CommentReactionRow"

export default function CommentRow(props: { comment: Comment, isShowThreadTitle: boolean }) {

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

                        <span className="text-gray-500 ml-3">{EditDate.toHowManyAgoString(props.comment.createdAt)}</span>
                    </div>

                    <CommentMenu comment={props.comment} />
                </div>

                <p>{props.comment.text}</p>

                <CommentImagesGrid imageUrls={props.comment.imageUrls} />

                {props.isShowThreadTitle &&
                    <div className="mt-1">
                        <CommentThreadTitle threadId={props.comment.threadId} />
                    </div>
                }

                <div className="mt-1">
                    <CommentReactionRow comment={props.comment} />
                </div>
            </div>
        </div>
    )
}