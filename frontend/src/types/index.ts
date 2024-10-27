export type Post = {
    post: {
        description: string
        image: string | null
        id?: number
    },
    name: string,
    like: boolean
}