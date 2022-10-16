import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

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

    static uidFromLocalStorage(): string | null {

        const uid = localStorage.getItem('uid')
        return uid
    }

    static async signIn(email: string, password: string): Promise<string | null> {

        const auth = getAuth()
        return signInWithEmailAndPassword(auth, email, password)
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

    static async signUp(email: string, password: string, displayName: string, userTag: string): Promise<string | null> {
        const auth = getAuth()
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