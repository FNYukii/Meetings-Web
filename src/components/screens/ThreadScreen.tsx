import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import { db } from "../../utilities/firebase"
import FireComments from "../../utilities/FireComments"
import Comment from "../../entities/Comment"
import CommentRow from "../parts/rows/CommentRow"
import Thread from "../../entities/Thread"
import FireThreads from "../../utilities/FireThreads"
import BackButton from "../parts/buttons/BackButton"
import ProgressImage from "../parts/images/ProgressImage"
import { AiOutlinePlus } from "react-icons/ai"

export default function ThreadScreen() {

    const location = useLocation()
    const { threadId } = useParams()
    const [thread, setThread] = useState<Thread | null>(null)

    const [comments, setComments] = useState<Comment[] | null>(null)
    const [isLoadedComments, setIsLoadedComments] = useState(false)

    async function readThread() {

        const thread = await FireThreads.readThreadFromCache(threadId!)
        setThread(thread)

        document.title = `${thread?.title ?? "スレッド"} - Meetings`
    }

    async function startReadingComments() {

        const q = query(collection(db, "comments"), where("threadId", "==", threadId), orderBy("createdAt"), limit(1000))

        onSnapshot(q, (querySnapshot) => {

            // 成功
            console.log(`Read ${querySnapshot.size} Comments from server / cache.`)

            // 配列comments
            let comments: Comment[] = []
            querySnapshot.forEach((doc) => {
                const comment = FireComments.toComment(doc)
                comments.push(comment)
            })

            setComments(comments)
            setIsLoadedComments(true)

        }, (error) => {

            setIsLoadedComments(true)
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
                <div className='relative h-14 pl-1 pr-1 flex items-center justify-between bg-white/70 dark:bg-black/70 backdrop-blur'>

                    <div className='absolute top-0 left-0 w-full h-full cursor-pointer' onClick={() => window.scrollTo(0, 0)}></div>

                    <div className="flex items-center">
                        <BackButton />
                        <span className='font-bold text-lg ml-6'>{thread?.title ?? ""}</span>
                    </div>

                    <Link to="/new-comment" state={{ previousPath: location.pathname }} className="z-10 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900">
                        <AiOutlinePlus className="text-2xl" />
                    </Link>
                </div>
            </div>

            {!isLoadedComments &&
                <div className='flex justify-center p-3'>
                    <ProgressImage />
                </div>
            }

            {isLoadedComments && comments === null &&
                <div className="p-2">
                    <p className="text-gray-500 text-center">読み取りに失敗しました。</p>
                </div>
            }

            {isLoadedComments && comments !== null &&
                <div className="mt-1">
                    {comments.map((comment) => (
                        <CommentRow key={comment.id} comment={comment} />
                    ))}
                </div>
            }
        </div>
    )
}