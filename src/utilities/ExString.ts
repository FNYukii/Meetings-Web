export default class ExString {

    static toLimitedArray(from: string[], limit: number): string[] {

        const inputItems = from

        let outputItems: string[] = []
        inputItems.forEach((item) => {
            if (outputItems.length < limit) {
                outputItems.push(item)
            }
        })

        return outputItems
    }
}