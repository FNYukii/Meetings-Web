import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import User from "../../../entities/User"
import FireAuth from "../../../utilities/FireAuth"
import FireUsers from "../../../utilities/FireUsers"
import PickIconImageButton from "../buttons/PickIconImageButton"
import SubmitButton from "../buttons/SubmitButton"
import DynamicTextarea from "../inputs/DynamicTextarea"

function EditUserSection(props: {user: User}) {

    const navigate = useNavigate()

    const [displayName, setDisplayName] = useState("")
    const [userTag, setUserTag] = useState("")
    const [introduction, setIntroduction] = useState("")

    const [isLoading, setIsLoading] = useState(false)

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

        setIsLoading(true)

        // ログイン状態を確認
        const uid = FireAuth.uid()
        if (uid === null) {

            setIsLoading(false)
            return
        }

        // userTagの形式を確認
        if (!userTag.match(/^\w{5,}$/)) {
            alert("ユーザータグの形式が不正です。")
            setIsLoading(false)
            return
        }

        // userTagの重複を確認
        const isUserTagDuplicate = await FireUsers.readIsUserTagDuplicate(userTag)

        if (isUserTagDuplicate === null) {
            alert("ユーザータグの重複の確認に失敗しました。")
            setIsLoading(false)
            return
        }

        if (isUserTagDuplicate) {
            alert("そのユーザータグは既に利用されています。")
            setIsLoading(false)
            return
        }

        // userドキュメントを更新
        const userId = await FireUsers.updateUser(uid, displayName, userTag, introduction, null)

        // 失敗
        if (userId === null) {
            alert("プロフィールの更新に失敗しました。")
            setIsLoading(false)
            return
        }

        // 成功
        navigate(-1)
    }

    return (
        <div>

            <p className="ml-3 mt-3 font-bold text-2xl">プロフィールを編集</p>

            <PickIconImageButton className="mt-3 mx-3" />

            <form onSubmit={(e) => onSubmit(e)}>
                <div className="px-3 mt-3">

                    <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="ディスプレイネーム" className="w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                    <input type="text" value={userTag} onChange={(e) => setUserTag(e.target.value)} placeholder="ユーザータグ" className="mt-5 w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />

                    <DynamicTextarea value={introduction} setValue={setIntroduction} placeholder="自己紹介" className="mt-5 w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600" />
                </div>

                <div className="mt-3 flex justify-end">
                    <SubmitButton text="保存" isLoading={isLoading} disabled={!displayName.match(/\S/g) || displayName.length > displayNameMax || !userTag.match(/\S/g) || userTag.length > userTagMax || introduction.length > introductionMax} />
                </div>
            </form>
        </div>
    )
}

export default EditUserSection