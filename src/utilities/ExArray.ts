export default class ExArray {

    static toLimited(from: Array<any>, limit: number): Array<any> {

        const inputItems = from

        let outputItems: Array<any> = []
        inputItems.forEach((item) => {
            if (outputItems.length < limit) {
                outputItems.push(item)
            }
        })

        return outputItems
    }
}