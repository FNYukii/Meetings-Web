import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import Comment from "../../../entities/Comment"
import { db } from "../../../utilities/firebase"
import FireComments from "../../../utilities/FireComments"
import ProgressImage from "../images/ProgressImage"
import CommentRow from "../rows/CommentRow"

function CommentsInThreadList(props: { threadId: string }) {

    const [comments, setComments] = useState<Comment[] | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    async function listenComments() {

        const q = query(collection(db, "comments"), where("threadId", "==", props.threadId), orderBy("createdAt"), limit(1000))

        onSnapshot(q, async (querySnapshot) => {

            if (querySnapshot.metadata.hasPendingWrites) return
            
            // 配列comments
            let comments: Comment[] = []
            querySnapshot.forEach((doc) => {
                const comment = FireComments.toComment(doc)
                comments.push(comment)
            })

            const unmutedComments = await FireComments.toUnmutedComments(comments)
            if (!unmutedComments) {
                setIsLoaded(true)
                return
            }

            setComments(unmutedComments)
            setIsLoaded(true)

        }, (error) => {

            console.log(`Comments reading failed. ${error}`)
            setIsLoaded(true)
        })
    }

    useEffect(() => {

        listenComments()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            {!isLoaded &&
                <div className='flex justify-center p-3'>
                    <ProgressImage />
                </div>
            }

            {isLoaded && comments === null &&
                <div className="p-2">
                    <p className="text-gray-500 text-center">読み取りに失敗しました</p>
                </div>
            }

            {isLoaded && comments !== null && comments.length === 0 &&
                <div className="p-3">
                    <p className="text-gray-500 text-center">まだコメントはありません</p>
                </div>
            }

            {isLoaded && comments !== null &&
                <div className="mt-1">
                    {comments.map((comment) => (
                        <CommentRow key={comment.id} comment={comment} />
                    ))}
                </div>
            }
        </div>
    )
}

export default CommentsInThreadList