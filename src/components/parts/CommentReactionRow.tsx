import { AiOutlineHeart } from "react-icons/ai";
import Comment from "../../types/Comment";

export default function CommentReactionRow(props: { comment: Comment }) {

    

    return (
        <div className="flex">

            <button className="z-10 flex items-center" onClick={() => console.log("hello")}>
                <AiOutlineHeart className="text-xl text-gray-500 "/>
                <span className="text-gray-500 ml-1">0</span>
            </button>
        </div>
    )
}