import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { AiOutlineExclamationCircle, AiOutlineHeart } from "react-icons/ai";
import Comment from "../../../entities/Comment";
import User from "../../../entities/User";
import { auth } from "../../../utilities/firebase";
import FireUsers from "../../../utilities/FireUsers";

export default function CommentLikeButton(props: { comment: Comment, isReadFromSeaver: boolean, className?: string}) {

    const [likedUsers, setLikedUsers] = useState<User[] | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    const [uid, setUid] = useState<string | null>(null)

    async function readLikedUsers() {
        
        let likedUsers = await FireUsers.readLikedUsersFromCache(props.comment.id)
        setLikedUsers(likedUsers)
        setIsLoaded(true)

        if (props.isReadFromSeaver) {
            likedUsers = await FireUsers.readLikedUsers(props.comment.id)
            setLikedUsers(likedUsers)
            setIsLoaded(true)
        }
    }

    useEffect(() => {
        readLikedUsers()

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid)
            } else {
                setUid(null)
            }
        })
    })

    return (
        <div className={props.className}>
            {!isLoaded &&
                <div className="flex">

                    <button disabled={true} className="z-10 flex items-center p-1 rounded-full pointer-events-auto hover:bg-zinc-100 dark:hover:bg-zinc-900">
                        <AiOutlineHeart className="text-xl text-gray-500 " />
                        <span className="text-gray-500 ml-1">0</span>
                    </button>
                </div>
            }

            {isLoaded && likedUsers === null &&
                <div>
                    <AiOutlineExclamationCircle className="text-gray-500 pointer-events-auto text-xl"/>
                </div>
            }

            {isLoaded && likedUsers !== null &&
                <div className="flex">

                    <button disabled={uid === null} className={`z-10 flex items-center p-1 rounded-full pointer-events-auto ${uid === null ? "" : "hover:bg-zinc-100 dark:hover:bg-zinc-900"}`}>
                        <AiOutlineHeart className="text-xl text-gray-500 " />
                        <span className="text-gray-500 ml-1">{likedUsers?.length ?? "0"}</span>
                    </button>
                </div>
            }
        </div>
    )
}