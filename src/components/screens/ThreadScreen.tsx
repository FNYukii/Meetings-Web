import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../../utilities/firebase"
import FireComment from "../../utilities/FireComment"
import Comment from "../../types/Comment"
import CommentRow from "../parts/CommentRow"
import Thread from "../../types/Thread"
import FireThread from "../../utilities/FireThread"
import progress from "../../images/progress.svg"
import BackButton from "../parts/BackButton"

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
            <div className='sticky top-0 z-20'>
                <div className='relative h-14 px-3 flex items-center bg-white/70 dark:bg-black/70 backdrop-blur'>

                    <div className='absolute top-0 left-0 w-full h-full cursor-pointer' onClick={() => window.scrollTo(0, 0)}></div>

                    <BackButton/>
                    
                    <span className='font-bold text-lg'>{thread?.title ?? ""}</span>
                </div>
            </div>

            {!isLoaded &&
                <div className='flex justify-center'>
                    <img src={progress} alt='loading' />
                </div>
            }

            {isLoaded &&
                <div className="mt-1">
                    {comments.map((comment) => (
                        <CommentRow key={comment.id} comment={comment} />
                    ))}
                </div>
            }
        </div>
    )
}