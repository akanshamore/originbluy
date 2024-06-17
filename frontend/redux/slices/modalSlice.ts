import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Media } from '@/helpers/types'


// Define a type for the slice state
interface ModalSlice {
    url: string;
    _id: string
}

// Define the initial state using that type
const initialState: ModalSlice = {
    url: '',
    _id: ''
}

export const modalSlice = createSlice({
    name: 'modal',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {

        // Use the PayloadAction type to declare the contents of `action.payload`
        openModal: (state, action: PayloadAction<Media>) => {
            state.url = action.payload.url;
            state._id = action.payload._id
        },
        closeModal: (state) => {
            state.url = '';
            state._id = ''
        }
    },
})

export const { openModal, closeModal } = modalSlice.actions



export default modalSlice.reducer