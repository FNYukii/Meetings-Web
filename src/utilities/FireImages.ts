import { ref, uploadBytes } from "firebase/storage"
import { storage } from "./firebase"
import { v4 } from "uuid"

class FireImages {

    static async uploadIconImage(file: File): Promise<string | null> {

        // UUIDを使ってランダムなファイル名を生成
        const fileName: string = `${v4}.jpg`

        // Firebase Cloud Storageの参照を作成
        const storageRef = ref(storage, `icons/${fileName}`)

        // ファイルをアップロード
        return await uploadBytes(storageRef, file)
            .then((snapshot) => {
                console.log("Uploaded 1 file.");
                return file.name
            })
            .catch((error) => {
                console.log(`Failed to uploading file. ${error}`);
                return null
            })
    }
}

export default FireImages