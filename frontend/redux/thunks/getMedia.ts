import { useSession } from "@/ctx";
import { URL } from "@/helpers/urls";
import { createAsyncThunk } from "@reduxjs/toolkit"





type Req = {
    session: string;

}
export const getMedia = createAsyncThunk(
    'getMedia',
    async ({ session }: Req) => {

        const response = await fetch(URL.MEDIA_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': session ?? ''
            },

        })
        const result = await response.json()


        return result
    },
)