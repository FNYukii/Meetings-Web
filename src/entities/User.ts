type User = {
    id: string
    userTag: string

    displayName: string
    introduction: string
    iconUrl: string | null
    likedCommentIds: string[]
}

export default User