import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Media } from '@/helpers/types'


// Define a type for the slice state
interface MediaSlice {
    url: string;
    _id: string
}

// Define the initial state using that type
const initialState: MediaSlice = {
    url: '',
    _id: ''
}

export const mediaSlice = createSlice({
    name: 'media',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {

        // Use the PayloadAction type to declare the contents of `action.payload`
        setSelectedMedia: (state, action: PayloadAction<Media>) => {
            state.url = action.payload.url;
            state._id = action.payload._id
        },
        clearSelectedMedia: (state) => {
            state.url = '';
            state._id = ''
        }
    },
})

export const { setSelectedMedia, clearSelectedMedia } = mediaSlice.actions



export default mediaSlice.reducer