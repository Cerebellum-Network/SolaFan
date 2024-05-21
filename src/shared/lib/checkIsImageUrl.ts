export const isImageUrl = (url: string) => /\.(png|jpg|bmp|jpeg?)$/i.test(url);

export const isVideoUrl = (url: string) => /\.(video|mp4|webm ?)$/i.test(url);
