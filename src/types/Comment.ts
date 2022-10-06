type Comment = {
    id: string
    userId: string
    createdAt: Date

    threadId: string
    text: string
    imageUrls: string[]
}

export default Comment