import { useState } from "react"
import { useParams } from "react-router-dom"

export default function ThreadScreen() {

    document.title = 'Thread - Meetings'

    const threadId = useParams()
    const [comments, setComments] = useState<Comment[] | null>(null)

    return (
        <div>
            <p>Thread</p>
        </div>
    )
}