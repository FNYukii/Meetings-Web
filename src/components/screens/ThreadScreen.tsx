import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../../utilities/firebase"
import FireComment from "../../utilities/FireComment"
import Comment from "../../types/Comment"
import CommentRow from "../parts/CommentRow"

export default function ThreadScreen() {

    document.title = 'Thread - Meetings'

    let { threadId } = useParams()
    const [comments, setComments] = useState<Comment[]>([])

    async function startReadingComments() {
        const q = query(collection(db, "comments"), where("threadId", "==", threadId))
        onSnapshot(q, (querySnapshot) => {

            let comments: Comment[] = []
            querySnapshot.forEach((doc) => {
                const comment = FireComment.toComment(doc)
                comments.push(comment)
            })

            setComments(comments)
        })
    }

    useEffect(() => {
        startReadingComments()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <div className='p-2 border-b border-gray-400 border-opacity-30'>
                <span className='font-bold text-lg'>ホーム</span>
            </div>

            <div>
                {comments.map((comment) => (
                    <CommentRow comment={comment}/>
                ))}
            </div>
        </div>
    )
}