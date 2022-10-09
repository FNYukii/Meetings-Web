import Comment from "../../types/Comment"
import UserDisplayNameSpan from "./UserDisplayNameSpan"
import UserIconNavLink from "./UserIconNavLink"
import UserUserTagSpan from "./UserUserTagSpan"
import EditDate from "../../utilities/EditDate"
import { NavLink } from "react-router-dom"
import CommentMenu from "./CommentMenu"
import CommentImagesGrid from "./CommentImagesGrid"
import CommentThreadTitle from "./CommentThreadTitle"
import CommentLikeButton from "./CommentLikeButton"

export default function CommentRow(props: { comment: Comment, isShowThreadTitle: boolean }) {

    return (
        <div className="flex p-3 relative">

            <NavLink to={`/comments/${props.comment.id}`} className="absolute top-0 left-0 w-full h-full hover:bg-zinc-500/10 dark:hover:bg-zinc-500/20" />

            <UserIconNavLink userId={props.comment.userId} />

            <div className="w-full">

                <div className="ml-3 flex justify-between items-center">

                    <div>
                        <UserDisplayNameSpan userId={props.comment.userId} />

                        <span className="ml-3">
                            <UserUserTagSpan userId={props.comment.userId} />
                        </span>

                        <span className="text-gray-500 ml-3">{EditDate.toHowManyAgoString(props.comment.createdAt)}</span>
                    </div>

                    <CommentMenu comment={props.comment} />
                </div>

                <p className="ml-3">{props.comment.text}</p>

                <div className="ml-3">
                    <CommentImagesGrid imageUrls={props.comment.imageUrls} />
                </div>

                {props.isShowThreadTitle &&
                    <div className="mt-1 ml-3">
                        <CommentThreadTitle threadId={props.comment.threadId} />
                    </div>
                }

                <div className="ml-2">
                    <CommentLikeButton comment={props.comment} isReadFromSeaver={false}/>
                </div>
            </div>
        </div>
    )
}