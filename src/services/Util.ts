export const removeVideo = (
  localStorageKey: string,
  videos: any,
  id: string
) => {
  var items = videos.filter((video: any) => video.id !== id);
  setGenericStorage(items, localStorageKey);
  return getStorage(localStorageKey);
};

export const redirect = (useHistory: any, url: string) => {
  return useHistory.push("playlists");
};

export const updateResearchedIconPLaylist = (id: string, colorTag: string) => {
  var researched = getStorage("researched");
  researched.map((r: any) => {
    if (r.id === id) r.playlist = false;
    r.fcolor = colorTag;
    return r;
  });
  setGenericStorage(researched, "researched");
};

export const setGenericStorage = (value: any, key: string) => {
  isTheme(key)
    ? localStorage.setItem(key, value)
    : localStorage.setItem(key, JSON.stringify(value));
  return getStorage(key);
};

export const getStorage = (key: string) => {
  if (isTheme(key)) {
    return localStorage.getItem(key) || "dark";
  } else if (isKeyword(key)) {
    return JSON.parse(localStorage.getItem(key) || "");
  }

  return JSON.parse(localStorage.getItem(key)! || "[]");
};

const isKeyword = (key: string) => key === "keyword";

const isTheme = (key: string) => key === "theme";
