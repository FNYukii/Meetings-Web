import { Link, useLocation } from "react-router-dom";
import Comment from "../../types/Comment";

export default function CommentImagesGrid(props: { comment: Comment, className?: string }) {

    const location = useLocation()

    return (
        <div className={props.className}>

            {props.comment.imageUrls.length === 1 &&

                <div className="mt-2 aspect-video">

                    <Link to={`/comments/${props.comment.id}/images/1`} state={{ previousPath: location.pathname }}>
                        <img src={props.comment.imageUrls[0]} alt="Attached to comment" className="rounded-xl w-full h-full object-cover border border-zinc-200 dark:border-zinc-800" />
                    </Link>
                </div>
            }

            {props.comment.imageUrls.length === 2 &&

                <div className="mt-2 flex aspect-video">

                    <div className="w-1/2 h-full pr-1">

                        <Link to={`/comments/${props.comment.id}/images/1`} state={{ previousPath: location.pathname }}>
                            <img src={props.comment.imageUrls[0]} alt="Attached to comment" className="rounded-xl w-full h-full object-cover border border-zinc-200 dark:border-zinc-800" />
                        </Link>
                    </div>

                    <div className="w-1/2 h-full pl-1">

                        <Link to={`/comments/${props.comment.id}/images/2`} state={{ previousPath: location.pathname }}>
                            <img src={props.comment.imageUrls[1]} alt="Attached to comment" className="rounded-xl w-full h-full object-cover border border-zinc-200 dark:border-zinc-800" />
                        </Link>
                    </div>
                </div>
            }

            {props.comment.imageUrls.length === 3 &&

                <div className="mt-2 flex aspect-video">

                    <div className="w-1/2 h-full pr-1">

                        <Link to={`/comments/${props.comment.id}/images/1`} state={{ previousPath: location.pathname }}>
                            <img src={props.comment.imageUrls[0]} alt="Attached to comment" className="rounded-xl w-full h-full object-cover border border-zinc-200 dark:border-zinc-800" />
                        </Link>
                    </div>

                    <div className="w-1/2 h-full pl-1">

                        <div className="h-1/2 pb-1">

                            <Link to={`/comments/${props.comment.id}/images/2`} state={{ previousPath: location.pathname }}>
                                <img src={props.comment.imageUrls[1]} alt="Attached to comment" className="rounded-xl w-full h-full object-cover border border-zinc-200 dark:border-zinc-800" />
                            </Link>
                        </div>

                        <div className="h-1/2 pt-1">

                            <Link to={`/comments/${props.comment.id}/images/3`} state={{ previousPath: location.pathname }}>
                                <img src={props.comment.imageUrls[2]} alt="Attached to comment" className="rounded-xl w-full h-full object-cover border border-zinc-200 dark:border-zinc-800" />
                            </Link>
                        </div>
                    </div>
                </div>
            }

            {props.comment.imageUrls.length === 4 &&

                <div className="mt-2 flex aspect-video">

                    <div className="w-1/2 h-full pr-1">

                        <div className="h-1/2 pb-1">

                            <Link to={`/comments/${props.comment.id}/images/1`} state={{ previousPath: location.pathname }}>
                                <img src={props.comment.imageUrls[0]} alt="Attached to comment" className="rounded-xl w-full h-full object-cover border border-zinc-200 dark:border-zinc-800" />
                            </Link>
                        </div>

                        <div className="h-1/2 pt-1">

                            <Link to={`/comments/${props.comment.id}/images/2`} state={{ previousPath: location.pathname }}>
                                <img src={props.comment.imageUrls[1]} alt="Attached to comment" className="rounded-xl w-full h-full object-cover border border-zinc-200 dark:border-zinc-800" />
                            </Link>
                        </div>
                    </div>

                    <div className="w-1/2 h-full pl-1">

                        <div className="h-1/2 pb-1">

                            <Link to={`/comments/${props.comment.id}/images/3`} state={{ previousPath: location.pathname }}>
                                <img src={props.comment.imageUrls[2]} alt="Attached to comment" className="rounded-xl w-full h-full object-cover border border-zinc-200 dark:border-zinc-800" />
                            </Link>
                        </div>

                        <div className="h-1/2 pt-1">

                            <Link to={`/comments/${props.comment.id}/images/4`} state={{ previousPath: location.pathname }}>
                                <img src={props.comment.imageUrls[3]} alt="Attached to comment" className="rounded-xl w-full h-full object-cover border border-zinc-200 dark:border-zinc-800" />
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}