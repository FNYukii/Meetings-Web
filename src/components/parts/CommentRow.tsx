import Comment from "../../types/Comment"
import UserDisplayNameSpan from "./UserDisplayNameSpan"
import UserIconNavLink from "./UserIconNavLink"
import UserUserTagSpan from "./UserUserTagSpan"
import EditDate from "../../utilities/EditDate"
import { NavLink } from "react-router-dom"
import CommentMenu from "./CommentMenu"
import ImagesGrid from "./ImagesGrid"
import { useEffect, useState } from "react"
import Thread from "../../types/Thread"
import FireThread from "../../utilities/FireThread"
import { BsCardText } from "react-icons/bs"

export default function CommentRow(props: { comment: Comment, isShowThreadTitle: boolean }) {

    const [thread, setThread] = useState<Thread | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    async function readThread() {
        const thread = await FireThread.readThreadFromCache(props.comment.threadId)
        setThread(thread)
        setIsLoaded(true)
    }

    useEffect(() => {
        if (props.isShowThreadTitle) {
            readThread()
        }
        // eslint-disable-next-line
    }, [])

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

                <p>{props.comment.text}</p>

                <ImagesGrid imageUrls={props.comment.imageUrls} />

                {props.isShowThreadTitle && isLoaded && thread !== null &&
                    <div className="flex">
                        <NavLink to={`/threads/${props.comment.threadId}`} className="z-10 flex items-center gap-2 hover:underline hover:decoration-gray-500">
                            <BsCardText className="text-zinc-500"/>
                            <span className="text-zinc-500">{thread.title}</span>
                        </NavLink>
                    </div>
                }
            </div>
        </div>
    )
}