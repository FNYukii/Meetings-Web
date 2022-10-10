import Comment from "../../types/Comment";

export default function RecentImageLargeRow(props: {comment: Comment}) {
    return (
        <div>
            <p>large</p>
            <p>{props.comment.text}</p>
        </div>
    )
}