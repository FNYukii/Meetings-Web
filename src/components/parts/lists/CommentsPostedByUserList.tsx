import { useEffect, useState } from "react"
import Comment from "../../../entities/Comment"
import FireComments from "../../../utilities/FireComments"
import CommentRow from "../rows/CommentRow"
import ProgressImage from "../images/ProgressImage"
import User from "../../../entities/User"
import { onSnapshot, doc } from "firebase/firestore"
import FireAuth from "../../../utilities/FireAuth"
import { db } from "../../../utilities/firebase"
import FireUsers from "../../../utilities/FireUsers"

function CommentsPostedByUserList(props: {user: User, className?: string}) {

    const userId = props.user.id
    const [comments, setComments] = useState<Comment[] | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    async function readComments() {

        setIsLoaded(false)
        
        const comments = await FireComments.readCommentsPostedByUser(userId!)
        setComments(comments)
        setIsLoaded(true)
    }

    const [mutedUserIds, setMutedUserIds] = useState<string[] | null>(null)

    async function listenMutedUserIds() {

        const uid = FireAuth.uid()
        if (!uid) return

        onSnapshot(doc(db, "users", uid), (doc) => {

            const user = FireUsers.toUserFromDocumentSnapshot(doc)
            setMutedUserIds(user.mutedUserIds)
            setIsLoaded(true)
        }, (error) => {

            console.log(`User reading failed. ${error}`)
            setIsLoaded(true)
        })
    }

    useEffect(() => {
        listenMutedUserIds()
    }, [])

    useEffect(() => {
        readComments()
        // eslint-disable-next-line
    }, [props.user.displayName, props.user.userTag, props.user.iconUrl, mutedUserIds])

    return (
        <div className={props.className}>
            {!isLoaded &&
                <div className='flex justify-center p-3'>
                    <ProgressImage/>
                </div>
            }

            {isLoaded && comments === null &&
                <div className="p-3">
                    <p className="text-gray-500 text-center">読み取りに失敗しました</p>
                </div>
            }

            {isLoaded && comments !== null && comments.length === 0 &&
                <div className="p-3">
                    <p className="text-gray-500 text-center">投稿したコメントはありません</p>
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

export default CommentsPostedByUserList