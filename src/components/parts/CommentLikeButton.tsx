import { useEffect, useState } from "react";
import { AiOutlineExclamationCircle, AiOutlineHeart } from "react-icons/ai";
import Comment from "../../entities/Comment";
import User from "../../entities/User";
import FireUser from "../../utilities/FireUser";

export default function CommentLikeButton(props: { comment: Comment, isReadFromSeaver: boolean, className?: string}) {

    const [likedUsers, setLikedUsers] = useState<User[] | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    async function readLikedUsers() {
        
        let likedUsers = await FireUser.readLikedUsersFromCache(props.comment.id)
        setLikedUsers(likedUsers)
        setIsLoaded(true)

        if (props.isReadFromSeaver) {
            likedUsers = await FireUser.readLikedUsers(props.comment.id)
            setLikedUsers(likedUsers)
            setIsLoaded(true)
        }
    }

    useEffect(() => {
        readLikedUsers()
        // eslint-disable-next-line
    }, [])

    return (
        <div className={props.className}>
            {!isLoaded &&
                <div className="flex">

                    <button className="z-10 flex items-center p-1 rounded-full pointer-events-auto hover:bg-zinc-100 dark:hover:bg-zinc-900" onClick={() => console.log("hello")}>
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

                    <button className="z-10 flex items-center p-1 rounded-full pointer-events-auto hover:bg-zinc-100 dark:hover:bg-zinc-900" onClick={() => console.log("hello")}>
                        <AiOutlineHeart className="text-xl text-gray-500 " />
                        <span className="text-gray-500 ml-1">{likedUsers?.length ?? "0"}</span>
                    </button>
                </div>
            }
        </div>
    )
}