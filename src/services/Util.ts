
export const removeVideo = (field: string, videos: any, id: any):Array<any> => {
    var l = videos.filter((video: any) => video.id !== id)
    localStorage.setItem(field, JSON.stringify(l))
    return Array.from(JSON.parse(localStorage.getItem(field)!))
}
