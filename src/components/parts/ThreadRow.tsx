import Thread from "../../types/Thread"

export default function ThreadRow(props: {thread: Thread}) {
    return (
        <div>{props.thread.title}</div>
    )
}