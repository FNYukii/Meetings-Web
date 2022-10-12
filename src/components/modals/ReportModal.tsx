import { useNavigate, useParams } from "react-router-dom"

export default function ReportModal(props: { className?: string }) {

    document.title = "報告 - Meetings"

    const navigate = useNavigate()

    const { collectionName, documentId } = useParams()

    const body = document.body
    body.style.overflowY = "hidden"

    function closeModal() {
        body.style.overflowY = ""

        navigate(-1)
    }

    return (
        <div className={`z-30 fixed top-0 left-0 w-full h-full flex justify-center items-center ${props.className}`}>

            <div className="w-full h-full bg-black/20 dark:bg-white/20" onClick={closeModal}></div>

            <div className="absolute bg-white p-6 rounded-xl">

                <h2 className="text-2xl">

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

                <h3 className="text-xl">種類を選択</h3>
                
                <h3 className="text-xl">詳細を入力</h3>
            </div>
        </div>
    )
}