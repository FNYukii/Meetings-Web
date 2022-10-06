import { NavLink } from "react-router-dom"
import Thread from "../../types/Thread"
import EditDate from "../../utilities/EditDate"
import ThreadMenu from "./ThreadMenu"
import UserIconNavLink from "./UserIconNavLink"
import UserUserTagSpan from "./UserUserTagSpan"

export default function ThreadRow(props: { thread: Thread }) {
    
    return (
        <NavLink to={`/threads/${props.thread.id}`} className="flex p-2 hover:bg-gray-50">
            <UserIconNavLink userId={props.thread.userId} />

            <div className="pl-2 w-full">
                <div className="flex justify-between">
                    <span className="font-bold hover:underline">{props.thread.title}</span>
                    <ThreadMenu thread={props.thread} />
                </div>

                <div>
                    <UserUserTagSpan userId={props.thread.userId} />
                    <span className="text-gray-500 ml-2">{EditDate.howManyAgo(props.thread.createdAt)}</span>

                    {props.thread.tags?.map((tag) => (
                        <span key={tag} className="ml-2">{tag}</span>
                    ))}
                </div>
            </div>
        </NavLink>
    )
}