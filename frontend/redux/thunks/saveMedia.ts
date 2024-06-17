import { CapturedMediaType } from "@/helpers/types";
import { URL } from "@/helpers/urls";
import { createAsyncThunk } from "@reduxjs/toolkit"





type Req = {

    capturedMedia: CapturedMediaType,
    session: string
}


export const saveMedia = createAsyncThunk(
    'saveMedia',
    async ({ capturedMedia, session }: Req) => {

        // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = capturedMedia.data.uri;
        let filename = localUri.split('/').pop() || 'default_filename.jpg';

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;


        // Upload the image using the fetch and FormData APIs
        let formData = new FormData();
        // Assume "photo" is the name of the form field the server expects
        formData.append('media', {
            uri: localUri,
            name: filename,
            type
        } as any); // Cast to any to avoid TypeScript issues

        // Send the FormData using fetch
        const uploadResponse = await fetch(URL.SAVE_MEDIA_URL, {
            method: 'POST',
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': session ?? ''
            },
            body: formData,
        })
        const result = await uploadResponse.json();



        return result.token
    },
)