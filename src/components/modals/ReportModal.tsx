import { useEffect, useState } from "react"
import { MdOutlineClose } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"

export default function ReportModal(props: { className?: string }) {

    const navigate = useNavigate()
    const { collectionName, documentId } = useParams()
    const body = document.body

    const [radioSelection, setRadioSelection] = useState(0)

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

            <div className="absolute bg-white dark:bg-black pt-3 pb-6 pl-3 pr-6 rounded-xl width-600">

                <button onClick={closeModal} className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full">
                    <MdOutlineClose className="text-2xl text-gray-500" />
                </button>

                <h2 className="text-2xl font-bold ml-3">

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

                <fieldset className="mt-3 ml-3 flex gap-2 flex-col">
                    <legend className="text-xl">カテゴリ</legend>

                    <div className="mt-1 ml-1">
                        <input type="radio" id="radio01" name="category" className="p-3 cursor-pointer scale-125" onChange={() => setRadioSelection(0)} />
                        <label htmlFor="radio01" className="pl-3 cursor-pointer">暴力的</label>
                    </div>

                    <div className="ml-1">
                        <input type="radio" id="radio02" name="category" className="p-3 cursor-pointer scale-125" onChange={() => setRadioSelection(1)} />
                        <label htmlFor="radio02" className="pl-3 cursor-pointer">センシティブ</label>
                    </div>

                    <div className="ml-1">
                        <input type="radio" id="radio03" name="category" className="p-3 cursor-pointer scale-125" onChange={() => setRadioSelection(2)} />
                        <label htmlFor="radio03" className="pl-3 cursor-pointer">スパム</label>
                    </div>

                    <div className="ml-1">
                        <input type="radio" id="radio04" name="category" className="p-3 cursor-pointer scale-125" onChange={() => setRadioSelection(3)} />
                        <label htmlFor="radio04" className="pl-3 cursor-pointer">虚偽</label>
                    </div>
                </fieldset>

                <fieldset className="mt-3 ml-3">
                    <legend className="text-xl">詳細</legend>

                    <textarea placeholder="報告する理由を詳しく入力してください" className="resize-none mt-1 p-3 border rounded-md border-zinc-500 w-full" />
                </fieldset>


            </div>
        </div>
    )
}