export default class EditDate {

    static howManyAgo(from: Date): string {
        let posted = new Date(from)
        let diff = new Date().getTime() - posted.getTime()
        let progress = new Date(diff)

        if (progress.getUTCFullYear() - 1970) {
            return progress.getUTCFullYear() - 1970 + '年前'
        }
        
        if (progress.getUTCMonth()) {
            return progress.getUTCMonth() + 'ヶ月前'
        }
        
        if (progress.getUTCDate() - 1) {
            return progress.getUTCDate() - 1 + '日前'
        }
        
        if (progress.getUTCHours()) {
            return progress.getUTCHours() + '時間前'
        }
        
        if (progress.getUTCMinutes()) {
            return progress.getUTCMinutes() + '分前'
        }
        
        return progress.getUTCSeconds() + '秒前'
    }
}