import axios from 'axios'

const baseURL = 'https://www.googleapis.com/youtube/v3/search'
const KEY = 'AIzaSyBmqZYics9jH_awjOfhxLu9TH1F2yLuKd0'
const MAX = 6

export const search = async (keyword: string, pageToken?: string) => {
    const params = pageToken ? `&pageToken=${pageToken}` : ''
    const response = await axios.get(`${baseURL}?key=${KEY}&part=snippet&maxResults=${MAX}&q=${keyword}${params}`)
    return response.data;

}