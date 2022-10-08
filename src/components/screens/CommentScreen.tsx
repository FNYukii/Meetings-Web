import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Comment from "../../types/Comment"

export default function CommentScreen() {

    const { commentId } = useParams()
    const [comment, setComment] = useState<Comment | null>(null)

    async function readComment() {
        
    }

    useEffect(() => {
        readComment()
    }, [])

    return (
        <div>

        </div>
    )
}