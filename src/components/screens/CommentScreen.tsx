import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Comment from "../../entities/Comment"
import ExDate from "../../utilities/ExDate"
import FireComments from "../../utilities/FireComments"
import BackButton from "../parts/buttons/BackButton"
import CommentMenu from "../parts/menus/CommentMenu"
import CommentImagesGrid from "../parts/sections/CommentImagesGrid"
import UserDisplayNameLink from "../parts/links/UserDisplayNameLink"
import UserIconLink from "../parts/links/UserIconLink"
import UserUserTagLink from "../parts/links/UserUserTagLink"
import ThreadTitleLink from "../parts/links/ThreadTitleLink"
import CommentLikeButton from "../parts/buttons/CommentLikeButton"
import ProgressImage from "../parts/images/ProgressImage"
import TitleBar from "../parts/sections/TitleBar"

function CommentScreen() {

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
            <TitleBar justifyBetween>

                <div className="flex items-center">
                    <BackButton className="ml-1"/>
                    <span className='ml-7 font-bold text-lg'>コメント</span>
                </div>

                <div className="z-10">
                    {isLoaded && comment !== null &&
                        <CommentMenu comment={comment} iconClassName="text-3xl" className="mr-1" />
                    }
                </div>
            </TitleBar>

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
                                <UserDisplayNameLink userId={comment!.userId} />
                                <UserUserTagLink userId={comment!.userId} />
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

export default CommentScreen