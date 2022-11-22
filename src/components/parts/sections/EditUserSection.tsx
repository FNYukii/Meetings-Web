import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import User from "../../../entities/User"
import FireImages from "../../../utilities/FireImages"
import FireUsers from "../../../utilities/FireUsers"
import PickIconImageButton from "../buttons/PickIconImageButton"
import SubmitButton from "../buttons/SubmitButton"
import DynamicTextarea from "../inputs/DynamicTextarea"

function EditUserSection(props: { user: User }) {

    const navigate = useNavigate()

    const [displayName, setDisplayName] = useState("")
    const [userTag, setUserTag] = useState("")
    const [introduction, setIntroduction] = useState("")

    const [pickedIcon, setPickedIcon] = useState<File | null>(null)

    const [isUploading, setIsUploading] = useState(false)

    const displayNameMax = 30
    const userTagMax = 30
    const introductionMax = 300

    useEffect(() => {

        setDisplayName(props.user.displayName)
        setUserTag(props.user.userTag)
        setIntroduction(props.user.introduction)
        // eslint-disable-next-line
    }, [])

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsUploading(true)

        // アイコンが変更されない場合
        if (!pickedIcon) {

            // userドキュメントを更新
            const userId = await FireUsers.updateUser(displayName, userTag, introduction, props.user.iconUrl)

            // 失敗
            if (userId === null) {
                alert("プロフィールの更新に失敗しました。")
                setIsUploading(false)
                return
            }
        }

        // アイコンが変更された場合
        if (pickedIcon) {

            // 新しいアイコンをアップロード
            const newIconUrl = await FireImages.uploadIconImage(pickedIcon)

            // 失敗
            if (!newIconUrl) {
                alert("プロフィール画像の更新に失敗しました。")
                setIsUploading(false)
                return
            }

            // 成功
            // userドキュメントを更新
            const userId = await FireUsers.updateUser(displayName, userTag, introduction, props.user.iconUrl)

            // 失敗
            if (userId === null) {
                alert("プロフィールの更新に失敗しました。")
                setIsUploading(false)
                return
            }
        }

        // 成功
        navigate(-1)
    }

    return (
        <div>

            <p className="ml-3 mt-3 font-bold text-2xl">プロフィールを編集</p>

            <PickIconImageButton currentIconUrl={props.user.iconUrl} pickedIcon={pickedIcon} setPickedIcon={setPickedIcon} className="mt-3 mx-3" />

            <form onSubmit={(e) => onSubmit(e)}>
                <div className="px-3 mt-3">

                    <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="ディスプレイネーム" className="w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                    <input type="text" value={userTag} onChange={(e) => setUserTag(e.target.value)} placeholder="ユーザータグ" className="mt-5 w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />

                    <DynamicTextarea value={introduction} setValue={setIntroduction} placeholder="自己紹介" className="mt-5 w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                </div>

                <div className="mt-3 flex justify-end">
                    <SubmitButton text="保存" isLoading={isUploading} disabled={!displayName.match(/\S/g) || displayName.length > displayNameMax || !userTag.match(/\S/g) || userTag.length > userTagMax || introduction.length > introductionMax} />
                </div>
            </form>
        </div>
    )
}

export default EditUserSection