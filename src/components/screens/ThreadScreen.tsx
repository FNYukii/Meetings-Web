import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../../utilities/firebase"
import FireComment from "../../utilities/FireComment"
import Comment from "../../types/Comment"
import CommentRow from "../parts/CommentRow"
import Thread from "../../types/Thread"
import FireThread from "../../utilities/FireThread"
import TitleBar from "../parts/TitleBar"

export default function ThreadScreen() {

    const { threadId } = useParams()
    const [thread, setThread] = useState<Thread | null>(null)
    const [comments, setComments] = useState<Comment[]>([])

    async function readThread() {
        if (threadId !== undefined) {
            const thread = await FireThread.readThreadFromCache(threadId)
            setThread(thread)

            if (thread !== null) {
                document.title = `${thread?.title} - Meetings`
            }
        }
    }

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
        readThread()
        startReadingComments()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <TitleBar text={thread?.title ?? ""} isShowBackButton={true}/>

            <div>
                {comments.map((comment) => (
                    <CommentRow key={comment.id} comment={comment}/>
                ))}
            </div>
        </div>
    )
}