import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'


// Define a type for the slice state
interface AuthState {
    token: string
}

// Define the initial state using that type
const initialState: AuthState = {
    token: '',
}

export const authSlice = createSlice({
    name: 'auth',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {

        // Use the PayloadAction type to declare the contents of `action.payload`
        setToken: (state, action: PayloadAction<string>) => {
            state.token += action.payload
        },
    },
})

export const { setToken } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.auth.token

export default authSlice.reducer