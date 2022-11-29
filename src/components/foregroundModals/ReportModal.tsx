import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import FireReports from "../../utilities/FireReports"
import SubmitButton from "../parts/buttons/SubmitButton"
import DynamicTextarea from "../parts/inputs/DynamicTextarea"
import FormModal from "../parts/modals/FormModal"

function ReportModal(props: { className?: string }) {

    const navigate = useNavigate()
    const { collectionName, documentId } = useParams()

    const [probremIndex, setProbremIndex] = useState<number | null>(null)
    const [detail, setDetail] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const detailMax = 300

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        addReport()
    }

    async function addReport() {

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

    return (
        <FormModal title="報告 - Meetings">
            <div>
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

                        <DynamicTextarea value={detail} setValue={setDetail} placeholder="具体的に入力してください" className="mt-3 w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                    </fieldset>

                    <div className="mt-3 flex justify-end">
                        <SubmitButton text="送信" isLoading={isLoading} disabled={probremIndex === null || !detail.match(/\S/g) || detail.length > detailMax} />
                    </div>
                </form>
            </div>
        </FormModal>
    )
}

export default ReportModal