import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default class FireAuth {

    static uid(): string | null {

        const auth = getAuth()
        const uid = auth.currentUser?.uid

        if (uid) {
            return uid
        } else {
            return null
        }
    }

    static async signUp(): Promise<string | null> {
        return null
    }

    static async signIn(email: string, password: string): Promise<string | null> {

        const auth = getAuth()
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                // 成功
                const uid = userCredential.user.uid
                return uid
            })
            .catch((error) => {

                // 失敗
                return null
            })
    }

    static async signOut(): Promise<string | null> {

        const uid = this.uid()

        if (uid === null) {
            return null
        }

        const auth = getAuth()
        return auth.signOut()
            .then(() => {
                return uid
            })
            .catch((error) => {
                return null
            })
    }
}