import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import Thread from "../../types/Thread"
import ExDate from "../../utilities/ExDate"
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
        <div className="flex pt-3 pl-3 relative">

            <NavLink to={`/threads/${props.thread.id}`} className="absolute top-0 left-0 w-full h-full hover:bg-zinc-500/10 dark:hover:bg-zinc-500/20"/>

            <UserIconNavLink userId={props.thread.userId} />

            <div className="pl-3 w-full">
                <div className="flex justify-between mr-2">
                    <span className="font-bold">{props.thread.title}</span>
                    <ThreadMenu thread={props.thread} />
                </div>

                <div className="mr-3">
                    <p className="text-gray-500">{firstComment?.text ?? ""}</p>
                </div>

                <div className="flex gap-2 flex-wrap mr-3">
                    <UserUserTagSpan userId={props.thread.userId} />
                    <span className="text-gray-500">{ExDate.toHowManyAgoString(props.thread.createdAt)}</span>

                    {Object.values(props.thread.tags).map((tag) => (
                        <NavLink key={tag} to={`/search?keyword=${tag}`} className="z-10 hover:underline">{tag}</NavLink>
                    ))}
                </div>
            </div>
        </div>
    )
}