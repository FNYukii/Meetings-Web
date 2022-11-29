import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "./firebase"
import { v4 } from "uuid"

class FireImages {

    static async uploadImage(file: File, folderName: string): Promise<string | null> {

        // UUIDを使ってランダムなファイル名を生成
        const fileName: string = `${v4()}.jpg`
        console.log(`fileName: ${fileName}`)

        // Firebase Cloud Storageの参照を作成
        const storageRef = ref(storage, `${folderName}/${fileName}`)

        // ファイルをアップロード
        return await uploadBytes(storageRef, file)
            .then(async () => {
                
                console.log("Uploaded 1 file.")

                // DownloadURLを取得
                const downloadURL = await getDownloadURL(storageRef)

                console.log(`downloadURL: ${downloadURL}`)
                return downloadURL
            })
            .catch((error) => {

                console.log(`Failed to uploading file. ${error}`)
                return null
            })
    }
}

export default FireImages