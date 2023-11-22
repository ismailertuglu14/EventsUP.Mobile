import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CurrentUser } from '../models/current_user'

export interface CurrentUserState {
    user: CurrentUser | undefined
}

const initialState: CurrentUserState = {
    user: undefined
}

export const userSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {

        setCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
            state.user = action.payload
        },
        clearCurrentUser: (state) => {
            state.user = undefined
        },
    },
})

// Action creators are generated for each case reducer function
export const { setCurrentUser, clearCurrentUser } = userSlice.actions

export default userSlice.reducer