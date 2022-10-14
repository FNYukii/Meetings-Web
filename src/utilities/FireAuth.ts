import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export default class FireAuth {

    static async signUp(): Promise<string | null> {
        return null
    }

    static async signIn(email: string, password: string) {

        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                // 成功
                const uid = userCredential.user.uid
            })
            .catch((error) => {

                // 失敗
                return null
            })
    }

    static async signOut() {

        const auth = getAuth()
        auth.signOut()
            .then(() => {

            })
            .catch((error) => {
                
            })
    }
}