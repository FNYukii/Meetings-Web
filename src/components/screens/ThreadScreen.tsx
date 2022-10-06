import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../../utilities/firebase"
import FireComment from "../../utilities/FireComment"
import Comment from "../../types/Comment"

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
            <div className="border-b p-2 font-bold text-lg">
                <span>スレッド</span>
            </div>

            <div>
                {comments.map((comment) => (
                    <span key={comment.id}>{comment.text}</span>
                ))}
            </div>
        </div>
    )
}