import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import Thread from "../../types/Thread"
import EditDate from "../../utilities/EditDate"
import FireComment from "../../utilities/FireComment"
import ThreadMenu from "./ThreadMenu"
import UserIconNavLink from "./UserIconNavLink"
import UserUserTagSpan from "./UserUserTagSpan"
import Comment from "../../types/Comment"

export default function ThreadRow(props: { thread: Thread }) {

    const [firstComment, setFirstComment] = useState<Comment | null>(null)

    async function readFirstComment() {
        const comment = await FireComment.readFirstCommentFromCache(props.thread.id)
        setFirstComment(comment)
    }

    useEffect(() => {
        readFirstComment()
        // eslint-disable-next-line 
    }, [])
    
    return (
        <div className="flex p-3 relative">

            <NavLink to={`/threads/${props.thread.id}`} className="absolute top-0 left-0 w-full h-full hover:bg-zinc-500/10 dark:hover:bg-zinc-500/20"/>

            <UserIconNavLink userId={props.thread.userId} />

            <div className="pl-3 w-full">
                <div className="flex justify-between">
                    <span className="font-bold">{props.thread.title}</span>
                    <ThreadMenu thread={props.thread} />
                </div>

                <div>
                    <p className="text-gray-500">{firstComment?.text ?? ""}</p>
                </div>

                <div className="flex gap-2 flex-wrap">
                    <UserUserTagSpan userId={props.thread.userId} />
                    <span className="text-gray-500">{EditDate.howManyAgo(props.thread.createdAt)}</span>

                    {Object.values(props.thread.tags).map((tag) => (
                        <span key={tag}>{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}