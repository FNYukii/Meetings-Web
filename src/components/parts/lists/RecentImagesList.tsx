import { useEffect, useState } from "react"
import Comment from "../../../entities/Comment"
import FireComments from "../../../utilities/FireComments"
import ProgressImage from "../imgs/ProgressImage"
import RecentImageLargeRow from "../rows/RecentImageLargeRow"
import RecentImageSmallRow from "../rows/RecentImageSmallRow"

export default function RecentImagesList(props: {className?: string}) {

    const [comments, setComments] = useState<Comment[] | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    async function readComments() {

        const comments = await FireComments.readCommentsWithImages()
        setComments(comments)
        setIsLoaded(true)
    }

    useEffect(() => {

        readComments()
    }, [])

    return (
        <div className={props.className}>
            {!isLoaded &&
                <div className='flex justify-center p-3'>
                    <ProgressImage/>
                </div>
            }

            {isLoaded && comments === null &&
                <div className="p-2">
                    <p className="text-gray-500 text-center">読み取りに失敗しました。</p>
                </div>
            }

            {isLoaded && comments !== null && comments.length === 0 &&
                <div className="p-2">
                    <p className="text-gray-500 text-center">結果なし</p>
                </div>
            }

            {isLoaded && comments !== null &&
                <div>
                    {comments.map((comment, index) => (
                        <div key={`${index}`}>
                            {index === 0 &&
                                <RecentImageLargeRow comment={comment}/>
                            }

                            {index !== 0 &&
                                <RecentImageSmallRow comment={comment}/>
                            }
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}