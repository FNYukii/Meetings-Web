import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Comment from "../../types/Comment"
import EditDate from "../../utilities/EditDate"
import FireComment from "../../utilities/FireComment"
import BackButton from "../parts/BackButton"
import CommentMenu from "../parts/CommentMenu"
import ImagesGrid from "../parts/ImagesGrid"
import UserDisplayNameSpan from "../parts/UserDisplayNameSpan"
import UserIconNavLink from "../parts/UserIconNavLink"
import UserUserTagSpan from "../parts/UserUserTagSpan"
import progress from "../../images/progress.svg"

export default function CommentScreen() {

    document.title = "コメント - Meetings"

    const { commentId } = useParams()
    const [comment, setComment] = useState<Comment | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    async function readComment() {
        const comment = await FireComment.readCommentFromCache(commentId!)
        setComment(comment)
        setIsLoaded(true)
    }

    useEffect(() => {
        readComment()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <div className='sticky top-0 z-20'>
                <div className='relative h-14 px-3 flex items-center bg-white/70 dark:bg-black/70 backdrop-blur'>
                    <div className='absolute top-0 left-0 w-full h-full cursor-pointer' onClick={() => window.scrollTo(0, 0)}></div>
                    <BackButton />
                    <span className='font-bold text-lg'>コメント</span>
                </div>
            </div>

            {!isLoaded &&
                <div className='flex justify-center'>
                    <img src={progress} alt='loading' />
                </div>
            }

            {isLoaded && comment !== null &&
                <div className="p-3">
                    <div className="flex justify-between">
                        <div className="flex gap-3">
                            <UserIconNavLink userId={comment?.userId ?? ""} />

                            <div className="flex flex-col">
                                <UserDisplayNameSpan userId={comment!.userId} />
                                <UserUserTagSpan userId={comment!.userId} />
                            </div>

                            <span className="text-gray-500">{EditDate.howManyAgo(comment!.createdAt)}</span>
                        </div>

                        <CommentMenu comment={comment!} />
                    </div>

                    <p className="mt-2">{comment!.text}</p>

                    <ImagesGrid imageUrls={comment!.imageUrls} />
                </div>
            }
        </div>
    )
}