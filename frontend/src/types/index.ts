export type Post = {
    post: {
        description: string
        image: string | null
        id?: number
    },
    name: string,
    like: boolean
}

export type Profile = {
    id: number
    user_name: string
    description: string | null
}

export type Comment = {
   comment: {
       user_id: number
       post_id: number
       text: string
   },
   user_name: string
}

export type User = {
    id: number
    user_name: string
}