export default class EditDate {

    static howManyAgo(from: Date): string {
        // 差分を生成
        let diff = new Date(new Date().getTime() - from.getTime())

        if (diff.getUTCFullYear() - 1970) {
            return diff.getUTCFullYear() - 1970 + '年前'
        }
        
        if (diff.getUTCMonth()) {
            return diff.getUTCMonth() + 'ヶ月前'
        }
        
        if (diff.getUTCDate() - 1) {
            return diff.getUTCDate() - 1 + '日前'
        }
        
        if (diff.getUTCHours()) {
            return diff.getUTCHours() + '時間前'
        }
        
        if (diff.getUTCMinutes()) {
            return diff.getUTCMinutes() + '分前'
        }
        
        return diff.getUTCSeconds() + '秒前'
    }
}