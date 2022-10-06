import { NavLink } from "react-router-dom"
import Thread from "../../types/Thread"
import EditDate from "../../utilities/EditDate"
import ThreadMenu from "./ThreadMenu"
import UserIconNavLink from "./UserIconNavLink"
import UserUserTagSpan from "./UserUserTagSpan"

export default function ThreadRow(props: { thread: Thread }) {
    
    return (
        <div className="flex p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 relative">

            <NavLink to={`/threads/${props.thread.id}`} className="absolute top-0 left-0 w-full h-full"/>

            <UserIconNavLink userId={props.thread.userId} />

            <div className="pl-3 w-full">
                <div className="flex justify-between">
                    <span className="font-bold">{props.thread.title}</span>
                    <ThreadMenu thread={props.thread} />
                </div>

                <div>
                    <UserUserTagSpan userId={props.thread.userId} />
                    <span className="text-gray-500 ml-3">{EditDate.howManyAgo(props.thread.createdAt)}</span>

                    {props.thread.tags?.map((tag) => (
                        <span key={tag} className="ml-3">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}