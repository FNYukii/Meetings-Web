import { useEffect, useState } from "react"
import Comment from "../../types/Comment"
import FireComment from "../../utilities/FireComment"
import progress from "../../images/progress.svg"
import CommentRow from "../parts/CommentRow"

export default function RecentImagesScreen() {

    const [comments, setComments] = useState<Comment[] | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    async function readComments() {

        const comments = await FireComment.readCommentsWithImages()
        setComments(comments)
        setIsLoaded(true)
    }

    useEffect(() => {

        readComments()
    }, [])

    return (
        <div>
            {!isLoaded &&
                <div className='flex justify-center p-3'>
                    <img src={progress} alt='loading' />
                </div>
            }

            {isLoaded && comments === null &&
                <div className="p-2">
                    <p className="text-gray-500 text-center">読み取りに失敗しました。</p>
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