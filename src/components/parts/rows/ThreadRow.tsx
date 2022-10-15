import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import Thread from "../../../entities/Thread"
import ExDate from "../../../utilities/ExDate"
import FireComments from "../../../utilities/FireComments"
import ThreadMenu from "../menus/ThreadMenu"
import UserIconNavLink from "../links/UserIconNavLink"
import UserUserTagSpan from "../spans/UserUserTagSpan"
import Comment from "../../../entities/Comment"

export default function ThreadRow(props: { thread: Thread }) {

    const [firstComment, setFirstComment] = useState<Comment | null>(null)

    async function readFirstComment() {
        const comment = await FireComments.readFirstCommentFromCache(props.thread.id)
        setFirstComment(comment)
    }

    useEffect(() => {
        readFirstComment()
        // eslint-disable-next-line 
    }, [])

    return (
        <div className="relative">

            <NavLink to={`/threads/${props.thread.id}`} className="absolute top-0 left-0 w-full h-full hover:bg-zinc-100 dark:hover:bg-zinc-900" />

            <div className="flex pt-3 pb-2 pl-3 z-10">

                <UserIconNavLink userId={props.thread.userId} />

                <div className="pl-3 w-full z-10 pointer-events-none">

                    <div className="flex justify-between mr-2">
                        <span className="font-bold">{props.thread.title}</span>
                        <ThreadMenu thread={props.thread}/>
                    </div>

                    <div className="mr-3">
                        <p className="text-gray-500">{firstComment?.text ?? ""}</p>
                    </div>

                    <div className="flex gap-2 flex-wrap mr-3">

                        <UserUserTagSpan userId={props.thread.userId} />
                        <span className="text-gray-500">{ExDate.toHowManyAgoString(props.thread.createdAt)}</span>

                        {Object.values(props.thread.tags).map((tag) => (
                            <NavLink key={tag} to={`/search?keyword=${tag}`} className="z-10 pointer-events-auto hover:underline">{tag}</NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}