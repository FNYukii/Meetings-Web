import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Comment from "../../entities/Comment"
import ExDate from "../../utilities/ExDate"
import FireComments from "../../utilities/FireComments"
import BackButton from "../parts/buttons/BackButton"
import CommentMenu from "../parts/menus/CommentMenu"
import CommentImagesGrid from "../parts/sections/CommentImagesGrid"
import UserDisplayNameSpan from "../parts/spans/UserDisplayNameSpan"
import UserIconLink from "../parts/links/UserIconNavLink"
import UserUserTagSpan from "../parts/spans/UserUserTagSpan"
import ThreadTitleLink from "../parts/links/ThreadTitleLink"
import CommentLikeButton from "../parts/buttons/CommentLikeButton"
import ProgressImage from "../parts/images/ProgressImage"

export default function CommentScreen() {

    document.title = "コメント - Meetings"

    const { commentId } = useParams()
    const [comment, setComment] = useState<Comment | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    async function readComment() {
        const comment = await FireComments.readCommentFromCache(commentId!)
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

                <div className='relative h-14 pl-1 pr-3 flex items-center justify-between bg-white/70 dark:bg-black/70 backdrop-blur'>

                    <div className='absolute top-0 left-0 w-full h-full cursor-pointer' onClick={() => window.scrollTo(0, 0)}></div>

                    <div className="flex items-center">
                        <BackButton />
                        <span className='font-bold text-lg ml-7'>コメント</span>
                    </div>

                    {isLoaded && comment !== null &&
                        <CommentMenu comment={comment} iconClassName="text-3xl" />
                    }
                </div>
            </div>

            {!isLoaded &&
                <div className='flex justify-center'>
                    <ProgressImage />
                </div>
            }

            {isLoaded && comment === null &&
                <div className="p-2">
                    <p className="text-gray-500 text-center">読み取りに失敗しました。</p>
                </div>
            }

            {isLoaded && comment !== null &&
                <div className="pt-3 pr-3">
                    <div className="flex justify-between ml-3">
                        <div className="flex gap-3">
                            <UserIconLink userId={comment?.userId ?? ""} />

                            <div className="flex flex-col">
                                <UserDisplayNameSpan userId={comment!.userId} />
                                <UserUserTagSpan userId={comment!.userId} />
                            </div>
                        </div>
                    </div>

                    <p className="mt-2 ml-3">{comment!.text}</p>

                    <CommentImagesGrid comment={comment} className="ml-3" />

                    <p className="text-gray-500 mt-2 ml-3">{ExDate.toStringUpToMinute(comment!.createdAt)}</p>

                    <ThreadTitleLink threadId={comment!.threadId} className="mt-1 ml-3" />

                    <CommentLikeButton comment={comment!} isReadFromSeaver={true} className="ml-2" />
                </div>
            }
        </div>
    )
}