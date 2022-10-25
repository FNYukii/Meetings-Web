import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { AiOutlineExclamationCircle, AiOutlineHeart } from "react-icons/ai";
import Comment from "../../../entities/Comment";
import { auth } from "../../../utilities/firebase";
import FireUsers from "../../../utilities/FireUsers";

export default function CommentLikeButton(props: { comment: Comment, isReadFromSeaver: boolean, className?: string}) {

    const [likedUserIds, setLikedUserIds] = useState<string[] | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    const [uid, setUid] = useState<string | null>(null)

    useEffect(() => {
        readLikedUsers()

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid)
            } else {
                setUid(null)
            }
        })

        // eslint-disable-next-line
    }, [])

    async function readLikedUsers() {
        
        let likedUsers = await FireUsers.readLikedUserIdsFromCache(props.comment.id)
        setLikedUserIds(likedUsers)
        setIsLoaded(true)

        if (props.isReadFromSeaver) {
            likedUsers = await FireUsers.readLikedUserIds(props.comment.id)
            setLikedUserIds(likedUsers)
            setIsLoaded(true)
        }
    }

    async function onClick() {

        // likedUserIdsの読み込みに失敗しているなら終了
        if (!likedUserIds) {
            return
        }

        // ログインしていないなら終了
        if (uid === null) {
            return
        }

        // ログイン中のユーザーのlikedCommentIdsを読み取り
        const user = await FireUsers.readUser(uid)

        // 失敗
        if (user === null) {
            return
        }

        // 成功
        const likedCommentIds = user.likedCommentIds

        if (likedCommentIds.includes(props.comment.id)) {

            FireUsers.unlikeComment(props.comment.id)
            
        } else {

            FireUsers.likeComment(props.comment.id)
        }

        readLikedUsers()
    }

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

            {isLoaded && likedUserIds === null &&
                <div>
                    <AiOutlineExclamationCircle className="text-gray-500 pointer-events-auto text-xl"/>
                </div>
            }

            {isLoaded && likedUserIds !== null &&
                <div className="flex">

                    <button onClick={() => onClick()} disabled={uid === null} className={`z-10 flex items-center p-1 rounded-full pointer-events-auto ${uid === null ? "" : "hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"}`}>
                        <AiOutlineHeart className="text-xl text-gray-500 " />
                        <span className="text-gray-500 ml-1">{likedUserIds?.length ?? "0"}</span>
                    </button>
                </div>
            }
        </div>
    )
}