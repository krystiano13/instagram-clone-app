export type Post = {
    post: {
        description: string
        image: string | null
        id?: number
    },
    name: string,
    like: boolean
}

export type Comment = {
   comment: {
       user_id: number
       post_id: number
       text: string
   },
   user_name: string
}