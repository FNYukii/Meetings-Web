import { ref } from "firebase/storage"
import { storage } from "./firebase"

class FireImages {

    static uploadImage(image: string) {
        const storageRef = ref(storage, `icons/sample`)
    }
}

export default FireImages