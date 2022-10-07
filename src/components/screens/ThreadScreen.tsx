import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../../utilities/firebase"
import FireComment from "../../utilities/FireComment"
import Comment from "../../types/Comment"
import CommentRow from "../parts/CommentRow"
import Thread from "../../types/Thread"
import FireThread from "../../utilities/FireThread"
import TitleBar from "../parts/TitleBar"
import progress from "../../images/progress.svg"

export default function ThreadScreen() {

    const { threadId } = useParams()
    const [thread, setThread] = useState<Thread | null>(null)
    const [comments, setComments] = useState<Comment[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

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
        const q = query(collection(db, "comments"), where("threadId", "==", threadId), orderBy("createdAt"), limit(1000))
        onSnapshot(q, (querySnapshot) => {

            let comments: Comment[] = []
            querySnapshot.forEach((doc) => {
                const comment = FireComment.toComment(doc)
                comments.push(comment)
            })

            setComments(comments)
            setIsLoaded(true)
        })
    }

    useEffect(() => {
        readThread()
        startReadingComments()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <TitleBar text={thread?.title ?? ""} isShowBackButton={true} />

            {!isLoaded &&
                <div className='flex justify-center'>
                    <img src={progress} alt='loading' />
                </div>
            }

            {isLoaded &&
                <div>
                    {comments.map((comment) => (
                        <CommentRow key={comment.id} comment={comment} />
                    ))}
                </div>
            }
        </div>
    )
}