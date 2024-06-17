export const isVideo = (url: string) => {
    const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv'];
    return videoExtensions.some(ext => url.endsWith(ext));
};