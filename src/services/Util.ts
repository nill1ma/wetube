export const removeVideo = (field: string, videos: any, id: any): Array<any> => {
    var l = videos.filter((video: any) => video.id !== id)
    localStorage.setItem(field, JSON.stringify(l))
    return JSON.parse(localStorage.getItem(field)!)
}

export const redirect = (useHistory: any, url: string) => {
    return useHistory.push('playlists')
}

export const updateResearchedIconPLaylist = (id: string, colorTag: string) => {
    var researched = JSON.parse(localStorage.getItem('researched')!)
    researched.map((r: any) => {
        if (r.id === id) r.playlist = false; r.fcolor = colorTag
    })
    localStorage.setItem('researched', JSON.stringify(researched))
}