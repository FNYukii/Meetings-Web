import { ref, uploadBytes } from "firebase/storage"
import { storage } from "./firebase"

class FireImages {

    static async uploadIconImage(file: File): Promise<string | null> {

        const storageRef = ref(storage, `icons/${file.name}`)

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