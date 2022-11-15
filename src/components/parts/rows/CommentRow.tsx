import Comment from "../../../entities/Comment"
import UserDisplayNameSpan from "../spans/UserDisplayNameSpan"
import UserIconLink from "../links/UserIconLink"
import UserUserTagLink from "../links/UserUserTagLink"
import ExDate from "../../../utilities/ExDate"
import { NavLink } from "react-router-dom"
import CommentMenu from "../menus/CommentMenu"
import CommentImagesGrid from "../sections/CommentImagesGrid"
import ThreadTitleLink from "../links/ThreadTitleLink"
import CommentLikeButton from "../buttons/CommentLikeButton"
import { useState } from "react"

export default function CommentRow(props: { comment: Comment, showThreadTitle?: boolean }) {

    const [isHidden, setIsHidden] = useState(false)

    return (

        <div>
            {!isHidden &&
                <div className="relative">

                    <NavLink to={`/comments/${props.comment.id}`} className="absolute top-0 left-0 w-full h-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition" />

                    <div className="flex pt-3 pb-1 pl-3">

                        <UserIconLink userId={props.comment.userId} />

                        <div className="w-full z-10 pointer-events-none">

                            <div className="ml-3 mr-2 flex justify-between">

                                <div className="flex flex-wrap gap-x-3">
                                    <UserDisplayNameSpan userId={props.comment.userId} />

                                    <UserUserTagLink userId={props.comment.userId} />

                                    <span className="text-gray-500">{ExDate.toHowManyAgoString(props.comment.createdAt)}</span>
                                </div>

                                <CommentMenu comment={props.comment} setIsHidden={setIsHidden} iconClassName="text-xl text-gray-500" />
                            </div>

                            <p className="ml-3 mr-3">{props.comment.text}</p>

                            <CommentImagesGrid comment={props.comment} className="mx-3" />

                            {props.showThreadTitle &&
                                <div className="mx-3">
                                    <ThreadTitleLink threadId={props.comment.threadId} className="pointer-events-auto" />
                                </div>
                            }

                            <CommentLikeButton comment={props.comment} isReadFromSeaver={false} className="ml-2 mr-3" />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}