import { useEffect, useState } from "react"
import { MdOutlineClose } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"
import FireReports from "../../utilities/FireReports"
import SubmitButton from "../parts/buttons/SubmitButton"

export default function ReportModal(props: { className?: string }) {

    const navigate = useNavigate()
    const { collectionName, documentId } = useParams()
    const body = document.body

    const [probremIndex, setProbremIndex] = useState<number | null>(null)
    const [detail, setDetail] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const detailMax = 300

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault()
        setIsLoading(true)

        if (probremIndex === null) {

            setIsLoading(false)
            return
        }

        const reportId = await FireReports.createReport(documentId!, collectionName!, probremIndex, detail)

        // 失敗
        if (reportId === null) {
            alert("報告の送信に失敗。")
            
            setIsLoading(false)
            return
        }

        // 成功
        navigate(-1)
    }

    const onKeyDown = (event: KeyboardEvent) => {

        if (event.key === "Escape") {
            navigate(-1)
        }
    }

    useEffect(() => {

        document.title = "報告 - Meetings"
        document.addEventListener("keydown", onKeyDown, false)
        body.style.overflowY = "hidden"
        
        return () => {
            body.style.overflowY = ""
            document.removeEventListener("keydown", onKeyDown, false)
        }

        // eslint-disable-next-line
    }, [])

    return (
        <div className={`z-30 fixed top-0 left-0 w-full h-full flex justify-center items-center ${props.className}`}>

            <div className="w-full h-full bg-black/20 dark:bg-white/20" onClick={() => navigate(-1)}></div>

            <div className="absolute bg-white dark:bg-black p-6 rounded-xl md:width-600 w-11/12">

                <button onClick={() => navigate(-1)} className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full">
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

                <form onSubmit={(e) => onSubmit(e)}>

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
                        <SubmitButton text="送信" isLoading={isLoading} disabled={probremIndex === null || detail === "" || detail.length > detailMax} />
                    </div>
                </form>
            </div>
        </div>
    )
}