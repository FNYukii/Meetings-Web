import { useEffect, useState } from "react"
import Comment from "../../../entities/Comment"
import FireComments from "../../../utilities/FireComments"
import CommentRow from "../rows/CommentRow"
import ProgressImage from "../images/ProgressImage"
import User from "../../../entities/User"

function CommentsLikedByUserList(props: {user: User, className?: string}) {

    const userId = props.user.id
    const [comments, setComments] = useState<Comment[] | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    async function readComments() {

        setIsLoaded(false)

        const comments = await FireComments.readCommentsLikedByUser(userId!)
        setComments(comments)
        setIsLoaded(true)
    }

    useEffect(() => {

        readComments()
        // eslint-disable-next-line
    }, [props.user.displayName, props.user.userTag, props.user.iconUrl, props.user.likedCommentIds])

    return (
        <div className={props.className}>
            {!isLoaded &&
                <div className='flex justify-center p-3'>
                    <ProgressImage/>
                </div>
            }

            {isLoaded && comments === null &&
                <div className="p-3">
                    <p className="text-gray-500 text-center">読み取りに失敗しました。</p>
                </div>
            }

            {isLoaded && comments !== null && comments.length === 0 &&
                <div className="p-3">
                    <p className="text-gray-500 text-center">結果なし</p>
                </div>
            }

            {isLoaded && comments !== null &&
                <div>
                    {comments.map((comment) => (
                        <CommentRow key={comment.id} comment={comment} showThreadTitle/>
                    ))}
                </div>
            }
        </div>
    )
}

export default CommentsLikedByUserList