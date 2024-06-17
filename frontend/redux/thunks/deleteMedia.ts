import { URL } from "@/helpers/urls";
import { createAsyncThunk } from "@reduxjs/toolkit"





type Req = {
    id: string;
    session: string;
}
export const deleteMedia = createAsyncThunk(
    'delete',
    async ({ id, session }: Req) => {
        const response = await fetch(URL.DELETE_MEDIA_URL + '/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': session ?? ''
            },

        })


        const result = await response.json()

        return result
    },
)