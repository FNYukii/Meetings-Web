import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default class FireAuth {

    static async signUp(): Promise<string | null> {
        return null
    }

    static async signIn(email: string, password: string): Promise<string | null> {

        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                // 成功
                const uid = userCredential.user.uid
                return uid
            })
            .catch((error) => {
                
                // 失敗
                return null
            });

        return null
    }
}