import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineExclamationCircle, AiOutlineHeart } from "react-icons/ai";
import Comment from "../../../entities/Comment";
import User from "../../../entities/User";
import FireAuth from "../../../utilities/FireAuth";
import { auth } from "../../../utilities/firebase";
import FireUsers from "../../../utilities/FireUsers";

export default function CommentLikeButton(props: { comment: Comment, isReadFromSeaver: boolean, className?: string }) {

    const [likedUsers, setLikedUsers] = useState<User[] | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    const [uid, setUid] = useState<string | null>(null)

    const [likedCommentIds, setLikedCommentIds] = useState<string[] | null>(null)

    useEffect(() => {
        readLikedUsers()
        readLikedCommentIds()
        startReadingAuthState()

        // eslint-disable-next-line
    }, [])

    function startReadingAuthState() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid)
            } else {
                setUid(null)
            }
        })
    }

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

    async function readLikedCommentIds() {

        // UIDを読み取り
        const uid = FireAuth.uid()
        if (uid === null) {
            return
        }

        // Userを読み取り
        const user = await FireUsers.readUser(uid)
        if (user === null) {
            return
        }

        const likedCommentIds = user.likedCommentIds
        setLikedCommentIds(likedCommentIds)
    }

    async function onClick() {

        // likedUserIdsの読み込みに失敗しているなら終了
        if (!likedUsers) {
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
        readLikedCommentIds()
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

            {isLoaded && likedUsers === null &&
                <div>
                    <AiOutlineExclamationCircle className="text-gray-500 pointer-events-auto text-xl" />
                </div>
            }

            {isLoaded && likedUsers !== null &&
                <div className="flex">

                    <button onClick={() => onClick()} disabled={uid === null} className={`z-10 p-1 rounded-full pointer-events-auto ${uid === null ? "" : "hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"}`}>

                        {!likedCommentIds?.includes(props.comment.id) &&
                            <div className="flex items-center">
                                <AiOutlineHeart className="text-xl text-gray-500" />
                                <span className="text-gray-500 ml-1">{likedUsers?.length ?? "0"}</span>
                            </div>
                        }

                        {likedCommentIds?.includes(props.comment.id) &&
                            <div className="flex items-center">
                                <AiFillHeart className="text-xl text-red-500" />
                                <span className="text-red-500 ml-1">{likedUsers?.length ?? "0"}</span>
                            </div>
                        }
                    </button>
                </div>
            }
        </div>
    )
}