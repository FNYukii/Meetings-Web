type Thread = {
    id: string
    userId: string
    createdAt: Date
    commentedAt: Date | null

    title: string
    tags: string[]
}

export default Thread