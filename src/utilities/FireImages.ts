import { ref, uploadBytes } from "firebase/storage"
import { storage } from "./firebase"

class FireImages {

    static uploadIconImage(file: Blob) {

        const storageRef = ref(storage, 'some-child')

        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        })
    }
}

export default FireImages