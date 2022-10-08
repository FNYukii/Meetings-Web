import { useParams } from "react-router-dom"

export default function UserScreen() {

    const { userId } = useParams()

    return (
        <div>
            <p>{userId!}</p>
        </div>
    )
}