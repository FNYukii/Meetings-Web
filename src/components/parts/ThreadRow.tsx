import Thread from "../../types/Thread"
import CreatedAtSpan from "./CreatedAtSpan"
import ThreadMenu from "./ThreadMenu"
import UserIconNavLink from "./UserIconNavLink"

export default function ThreadRow(props: {thread: Thread}) {

    return (
        <div className="flex p-2">
            <UserIconNavLink userId={props.thread.userId}/>

            <div className="pl-2 w-full">
                <div className="flex justify-between">
                    <span className="font-bold">{props.thread.title}</span>
                    <ThreadMenu thread={props.thread}/>
                </div>

                <CreatedAtSpan/>
            </div>
        </div>
    )
}