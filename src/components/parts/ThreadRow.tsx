import Thread from "../../types/Thread"
import UserIconNavLink from "./UserIconNavLink"

export default function ThreadRow(props: {thread: Thread}) {
    return (
        <div>

            <UserIconNavLink userId={props.thread.userId}/>
            {props.thread.title}
        </div>
    )
}