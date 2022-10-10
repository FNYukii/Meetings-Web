import dayjs from "dayjs"

export default class ExDate {

    static toHowManyAgoString(from: Date): string {
        // 差分を生成
        let diff = new Date(new Date().getTime() - from.getTime())

        if (diff.getUTCFullYear() - 1970) {
            return diff.getUTCFullYear() - 1970 + '年'
        }
        
        if (diff.getUTCMonth()) {
            return diff.getUTCMonth() + 'ヶ月'
        }
        
        if (diff.getUTCDate() - 1) {
            return diff.getUTCDate() - 1 + '日'
        }
        
        if (diff.getUTCHours()) {
            return diff.getUTCHours() + '時間'
        }
        
        if (diff.getUTCMinutes()) {
            return diff.getUTCMinutes() + '分'
        }
        
        return diff.getUTCSeconds() + '秒'
    }

    static toStringUpToMinute(from: Date): string {

        const inputDate = from
        const outputString = dayjs(inputDate).format('YYYY年M月D日 h時m分')

        return outputString
    }
}