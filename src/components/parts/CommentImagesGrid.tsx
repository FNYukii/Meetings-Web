import Comment from "../../types/Comment";
import CommentImageLink from "./CommentImageLink";

export default function CommentImagesGrid(props: { comment: Comment, className?: string }) {

    return (
        <div className={props.className}>

            {props.comment.imageUrls.length === 1 &&

                <div className="mt-2 aspect-video">
                    <CommentImageLink comment={props.comment} imageIndex={0} />
                </div>
            }

            {props.comment.imageUrls.length === 2 &&

                <div className="mt-2 flex aspect-video">

                    <div className="w-1/2 h-full pr-1">
                        <CommentImageLink comment={props.comment} imageIndex={0} />
                    </div>

                    <div className="w-1/2 h-full pl-1">
                        <CommentImageLink comment={props.comment} imageIndex={1} />
                    </div>
                </div>
            }

            {props.comment.imageUrls.length === 3 &&

                <div className="mt-2 flex aspect-video">

                    <div className="w-1/2 h-full pr-1">
                        <CommentImageLink comment={props.comment} imageIndex={0} />
                    </div>

                    <div className="w-1/2 h-full pl-1">

                        <div className="h-1/2 pb-1">
                            <CommentImageLink comment={props.comment} imageIndex={1} />
                        </div>

                        <div className="h-1/2 pt-1">
                            <CommentImageLink comment={props.comment} imageIndex={2} />
                        </div>
                    </div>
                </div>
            }

            {props.comment.imageUrls.length === 4 &&

                <div className="mt-2 flex aspect-video">

                    <div className="w-1/2 h-full pr-1">

                        <div className="h-1/2 pb-1">
                            <CommentImageLink comment={props.comment} imageIndex={0} />
                        </div>

                        <div className="h-1/2 pt-1">
                            <CommentImageLink comment={props.comment} imageIndex={1} />
                        </div>
                    </div>

                    <div className="w-1/2 h-full pl-1">

                        <div className="h-1/2 pb-1">
                            <CommentImageLink comment={props.comment} imageIndex={2} />
                        </div>

                        <div className="h-1/2 pt-1">
                            <CommentImageLink comment={props.comment} imageIndex={3} />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}