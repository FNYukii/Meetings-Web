import { useEffect, useState } from "react"
import { MdOutlineClose } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"
import FireReports from "../../utilities/FireReports"

export default function ReportModal(props: { className?: string }) {

    const navigate = useNavigate()
    const { collectionName, documentId } = useParams()
    const body = document.body

    const [probremIndex, setProbremIndex] = useState<number | null>(null)
    const [detail, setDetail] = useState("")
    
    function closeModal() {
        body.style.overflowY = ""
        navigate(-1)
    }

    function create() {

        if (probremIndex === null) {
            return
        }

        const result = FireReports.createReport(documentId!, collectionName!, probremIndex, detail)

        if (result !== null) {
            alert("報告を送信しました。")
            closeModal()
        }
    }

    useEffect(() => {
        
        document.title = "報告 - Meetings"
        body.style.overflowY = "hidden"
        // eslint-disable-next-line
    }, [])

    return (
        <div className={`z-30 fixed top-0 left-0 w-full h-full flex justify-center items-center ${props.className}`}>

            <div className="w-full h-full bg-black/20 dark:bg-white/20" onClick={closeModal}></div>

            <div className="absolute bg-white dark:bg-black p-6 rounded-xl md:width-600 w-11/12">

                <button onClick={closeModal} className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full">
                    <MdOutlineClose className="text-2xl text-gray-500" />
                </button>

                <p className="mt-3 text-2xl font-bold ml-3">

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
                </p>

                <fieldset className="mt-5 ml-3 flex gap-2 flex-col">

                    <legend className="text-xl">カテゴリ</legend>

                    <div className="mt-2 ml-1">
                        <input type="radio" id="radio01" name="category" className="p-3 cursor-pointer scale-125" onChange={() => setProbremIndex(0)} />
                        <label htmlFor="radio01" className="pl-3 cursor-pointer">暴力的</label>
                    </div>

                    <div className="ml-1">
                        <input type="radio" id="radio02" name="category" className="p-3 cursor-pointer scale-125" onChange={() => setProbremIndex(1)} />
                        <label htmlFor="radio02" className="pl-3 cursor-pointer">センシティブ</label>
                    </div>

                    <div className="ml-1">
                        <input type="radio" id="radio03" name="category" className="p-3 cursor-pointer scale-125" onChange={() => setProbremIndex(2)} />
                        <label htmlFor="radio03" className="pl-3 cursor-pointer">スパム</label>
                    </div>

                    <div className="ml-1">
                        <input type="radio" id="radio04" name="category" className="p-3 cursor-pointer scale-125" onChange={() => setProbremIndex(3)} />
                        <label htmlFor="radio04" className="pl-3 cursor-pointer">事実に反する</label>
                    </div>
                </fieldset>

                <fieldset className="mt-5 mx-3">

                    <legend className="text-xl">詳細</legend>

                    <textarea value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="具体的に説明してください" className="h-24 resize-none mt-3 p-3 border rounded-md border-gray-400 dark:border-gray-600 bg-transparent placeholder:text-gray-500 w-full" />
                </fieldset>

                <div className="mt-3 flex justify-end">
                    <button onClick={() => create()} disabled={probremIndex === null || detail === ""} className={`font-bold p-3 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 ${probremIndex !== null && detail !== "" ? "" : "text-gray-400 dark:text-gray-600 hover:bg-transparent dark:hover:bg-transparent"}`}>送信</button>
                </div>
            </div>
        </div>
    )
}