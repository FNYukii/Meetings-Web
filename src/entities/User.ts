type User = {
    id: string
    userTag: string

    displayName: string
    introduction: string
    iconUrl: string | null

    likedCommentIds: string[]
    mutedUserIds: string[]
}

export default User