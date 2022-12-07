import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export default class FireAuth {

    static uid(): string | null {

        const uid = auth.currentUser?.uid

        if (uid) {
            return uid
        } else {
            return null
        }
    }

    static uidFromLocalStorage(): string | null {

        const uid = localStorage.getItem('uid')
        return uid
    }

    static email(): string | null {

        const email = auth.currentUser?.email
        if (!email) return null

        return email
    }

    static async signIn(email: string, password: string): Promise<string | null> {

        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                // 成功
                const uid = userCredential.user.uid
                return uid
            })
            .catch((error) => {

                // 失敗
                console.log(`Failed to sign in. ${error}`)
                return null
            })
    }

    static async signUp(email: string, password: string): Promise<string | null> {

        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                
                // 成功
                const uid = userCredential.user.uid
                return uid
            })
            .catch((error) => {

                // 失敗
                console.log(`Failed to sign up. ${error}`)
                return null
            })
    }

    static async signOut(): Promise<string | null> {

        const uid = this.uid()

        if (uid === null) {
            return null
        }

        return auth.signOut()
            .then(() => {
                return uid
            })
            .catch((error) => {

                console.log(`Failed to sign out. ${error}`)
                return null
            })
    }
}