import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Comment from "../../types/Comment"
import FireComment from "../../utilities/FireComment"
import ProgressImage from "../parts/ProgressImage"

export default function ImageModal(props: { className?: string }) {

    document.title = "画像 - Meetings"

    const navigate = useNavigate()
    const { commentId, imageNumber } = useParams()

    const [comment, setComment] = useState<Comment | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    async function readComment() {
        const comment = await FireComment.readCommentFromCache(commentId!)
        setComment(comment)
        setIsLoaded(true)
    }

    useEffect(() => {
        readComment()
        // eslint-disable-next-line
    }, [])

    return (
        <div className={`${props.className} z-30 fixed top-0 left-0 w-full h-full flex justify-center items-center`}>

            <div className="w-full h-full bg-black/80" onClick={() => navigate(-1)}></div>

            <div className="absolute">

                {!isLoaded &&
                    <ProgressImage/>
                }

                {isLoaded && comment === null &&
                    <p className="text-gray-500 text-center">読み取りに失敗しました。</p>
                }

                {isLoaded && comment !== null &&
                    <img src={comment.imageUrls[(parseInt(imageNumber!) - 1)]} alt="" />
                }
            </div>
        </div>
    )
}