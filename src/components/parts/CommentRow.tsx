import Comment from "../../entities/Comment"
import UserDisplayNameSpan from "./UserDisplayNameSpan"
import UserIconNavLink from "./UserIconNavLink"
import UserUserTagSpan from "./UserUserTagSpan"
import ExDate from "../../utilities/ExDate"
import { NavLink } from "react-router-dom"
import CommentMenu from "./CommentMenu"
import CommentImagesGrid from "./CommentImagesGrid"
import CommentThreadTitle from "./CommentThreadTitle"
import CommentLikeButton from "./CommentLikeButton"

export default function CommentRow(props: { comment: Comment, showThreadTitle?: boolean }) {

    return (
        <div className="relative">

            {/* <NavLink to={`/comments/${props.comment.id}`} className="absolute top-0 left-0 w-full h-full hover:bg-zinc-500/10 dark:hover:bg-white/10" /> */}

            <NavLink to={`/comments/${props.comment.id}`} className="absolute top-0 left-0 w-full h-full hover:bg-zinc-100 dark:hover:bg-zinc-900" />

            <div className="flex pt-3 pb-1 pl-3">

                <UserIconNavLink userId={props.comment.userId} />

                <div className="w-full z-10 pointer-events-none">

                    <div className="ml-3 mr-2 flex justify-between">

                        <div className="flex flex-wrap gap-x-3">
                            <UserDisplayNameSpan userId={props.comment.userId} />

                            <UserUserTagSpan userId={props.comment.userId}/>

                            <span className="text-gray-500">{ExDate.toHowManyAgoString(props.comment.createdAt)}</span>
                        </div>

                        <CommentMenu comment={props.comment} iconClassName="text-xl text-gray-500" />
                    </div>

                    <p className="ml-3 mr-3">{props.comment.text}</p>

                    <CommentImagesGrid comment={props.comment} className="mx-3" />

                    {props.showThreadTitle &&
                        <div className="mt-1 mx-3">
                            <CommentThreadTitle threadId={props.comment.threadId} className="pointer-events-auto" />
                        </div>
                    }

                    <CommentLikeButton comment={props.comment} isReadFromSeaver={false} className="ml-2 mr-3" />
                </div>

            </div>


        </div>
    )
}