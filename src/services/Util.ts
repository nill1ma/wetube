export const removeVideo = (localStorageKey: string, videos: any, id: string) => {
    var items = videos.filter((video: any) => video.id !== id)
    setGenericStorage(items, localStorageKey)
    return getStorage(localStorageKey)
}

export const redirect = (useHistory: any, url: string) => {
    return useHistory.push('playlists')
}

export const updateResearchedIconPLaylist = (id: string, colorTag: string) => {
    var researched = getStorage('researched')
    researched.map((r: any) => {
        if (r.id === id) r.playlist = false; r.fcolor = colorTag
        return r
    })
    setGenericStorage(researched, 'researched')
}

export const setGenericStorage = (value: any, localStorageName: string) => {
    isTheme(localStorageName) ?
        localStorage.setItem(localStorageName, value) :
        localStorage.setItem(localStorageName, JSON.stringify(value))
    return getStorage(localStorageName)
}

export const getStorage = (localStorageName: string) => {
    return isTheme(localStorageName) ?
        (localStorage.getItem(localStorageName)! || 'dark') :
        JSON.parse(localStorage.getItem(localStorageName)! || '[]')
}

const isTheme = (localStorageName: string) => localStorageName === 'theme'