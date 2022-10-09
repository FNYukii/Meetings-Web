import { useEffect, useState } from "react";
import { AiOutlineExclamationCircle, AiOutlineHeart } from "react-icons/ai";
import Comment from "../../types/Comment";
import User from "../../types/User";
import FireUser from "../../utilities/FireUser";

export default function CommentLikeButton(props: { comment: Comment, isReadFromSeaver: boolean}) {

    const [likedUsers, setLikedUsers] = useState<User[] | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    async function readLikedUsers() {

        let likedUsers: User[] | null = null

        if (!props.isReadFromSeaver) {
            likedUsers = await FireUser.readLikedUsersFromCache(props.comment.id)
        } else {
            likedUsers = await FireUser.readLikedUsers(props.comment.id)
        }

        setLikedUsers(likedUsers)
        setIsLoaded(true)
    }

    useEffect(() => {
        readLikedUsers()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            {!isLoaded &&
                <div className="flex">

                    <button className="z-10 flex items-center" onClick={() => console.log("hello")}>
                        <AiOutlineHeart className="text-xl text-gray-500 " />
                        <span className="text-gray-500 ml-1">0</span>
                    </button>
                </div>
            }

            {isLoaded && likedUsers === null &&
                <div>
                    <AiOutlineExclamationCircle className="text-gray-500 text-xl"/>
                </div>
            }

            {isLoaded && likedUsers !== null &&
                <div className="flex">

                    <button className="z-10 flex items-center hover:bg-zinc-100 p-1 rounded-full" onClick={() => console.log("hello")}>
                        <AiOutlineHeart className="text-xl text-gray-500 " />
                        <span className="text-gray-500 ml-1">{likedUsers?.length ?? "0"}</span>
                    </button>
                </div>
            }
        </div>
    )
}