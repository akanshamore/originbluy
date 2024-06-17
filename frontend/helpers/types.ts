export type Media = {
    _id: string;
    user: string;
    url: string

}


export type CapturedMediaType = {
    data: {
        height: string;
        uri: string;
        width: string
    },
    type: string

}