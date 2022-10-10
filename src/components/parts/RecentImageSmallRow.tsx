import Comment from "../../types/Comment";

export default function RecentImageSmallRow(props: {comment: Comment}) {
    return (
        <div>
            <p>small</p>
            <p>{props.comment.text}</p>
        </div>
    )
}