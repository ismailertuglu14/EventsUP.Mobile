import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ColorSchemeName } from 'react-native'
export interface ThemeState {
    theme: string
}

const initialState: ThemeState = {
    theme: "light"
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { changeTheme } = themeSlice.actions

export default themeSlice.reducer