import { GenderEnum } from "../../../../features/models/gender_enum"

export interface PostModel {
    id: string
    user: User
    createdAt: string
    isFollowing: boolean
    description: string
    files: File[]
    community: any
    event: any
    interactionPreviews: any[]
    isInteracted: any
    isSaved: boolean
    commentCount: number
    interactionCount: number
}

export interface User {
    id: string
    fullName: string
    userName: string
    profileImage: string
    gender: GenderEnum
}

export interface File {
    file: string
    type: number
}
