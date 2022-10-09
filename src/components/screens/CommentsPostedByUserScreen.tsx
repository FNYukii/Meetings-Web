import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Comment from "../../types/Comment"
import FireComment from "../../utilities/FireComment"
import progress from "../../images/progress.svg"
import CommentRow from "../parts/CommentRow"

export default function CommentsPostedByUserScreen() {

    const { userId } = useParams()
    const [comments, setComments] = useState<Comment[] | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    async function readComments() {
        const comments = await FireComment.readCommentsPostedByUser(userId!)
        setComments(comments)
        setIsLoaded(true)
    }

    useEffect(() => {
        readComments()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            {!isLoaded &&
                <div className='flex justify-center p-3'>
                    <img src={progress} alt='loading' />
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
                        <CommentRow key={comment.id} comment={comment} isShowThreadTitle={true}/>
                    ))}
                </div>
            }
        </div>
    )
}