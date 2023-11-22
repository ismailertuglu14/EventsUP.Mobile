import { User } from "../../../../features/models/user"

export interface CommentModel {
    id: string
    user: User
    message: string
    createdAt: string
    isEdited: boolean
    replyCount: number
    isInteracted: IsInteracted
    interactionCounts: InteractionCounts
  }
  
  export interface IsInteracted {
    like: boolean
    dislike: boolean
  }
  
  export interface InteractionCounts {
    likeCount: number
    dislikeCount: number
  }
  