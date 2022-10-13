import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function ReportModal(props: { className?: string }) {

    const navigate = useNavigate()
    const { collectionName, documentId } = useParams()
    const body = document.body

    function closeModal() {
        body.style.overflowY = ""
        navigate(-1)
    }
    
    useEffect(() => {
        document.title = "報告 - Meetings"
        body.style.overflowY = "hidden"
    }, [])

    return (
        <div className={`z-30 fixed top-0 left-0 w-full h-full flex justify-center items-center ${props.className}`}>

            <div className="w-full h-full bg-black/20 dark:bg-white/20" onClick={closeModal}></div>

            <div className="absolute bg-white p-6 rounded-xl">

                <h2 className="text-2xl font-bold">

                    <span>
                        {collectionName === "threads" &&
                            <span>スレッド</span>
                        }

                        {collectionName === "comments" &&
                            <span>コメント</span>
                        }

                        {collectionName === "users" &&
                            <span>ユーザー</span>
                        }
                    </span>

                    <span>を報告</span>
                </h2>

                <fieldset className="mt-2 flex gap-1 flex-col">
                    <legend className="text-xl">カテゴリを選択</legend>

                    <div>
                        <input type="radio" id="alpha" name="drone" className="p-3 cursor-pointer scale-125" />
                        <label htmlFor="alpha" className="pl-3 cursor-pointer">alpha</label>
                    </div>

                    <div>
                        <input type="radio" id="bravo" name="drone" className="p-3 cursor-pointer scale-125" />
                        <label htmlFor="bravo" className="pl-3 cursor-pointer">bravo</label>
                    </div>

                    <div>
                        <input type="radio" id="charlie" name="drone" className="p-3 cursor-pointer scale-125" />
                        <label htmlFor="charlie" className="pl-3 cursor-pointer">charlie</label>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}