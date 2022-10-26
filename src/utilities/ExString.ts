export default class ExString {

    static randomText(): string {

        const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        const length = 20

        let text = ""
        for (let i = 0; i < length; i++) {

            const index = Math.floor(Math.random() * letters.length)
            text += letters[index]
        }

        return text
    }
}