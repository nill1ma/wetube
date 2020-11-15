import React, { useState, useContext, useEffect } from 'react'
import { Videos } from '../../interfaces/Videos'
import './styles.scss'
import { search } from '../../services/YoutubeApi'
import { faSearch, faStar, faFolderPlus, faArrowAltCircleLeft, faArrowAltCircleRight, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import YouTube from 'react-youtube';
import ThemeContext from '../../context';
import { removeVideo } from '../../services/Util'

export default function VideosArea() {

    const [videos, setVideos] = useState<Videos[]>([])
    const [keyWord, setKeyWord] = useState('')
    const [next, setNext] = useState('')
    const [back, setBack] = useState('')
    const [theme] = useContext(ThemeContext)

    var list: Videos[] = []

    const colorTag = ['rgb(255, 140, 0)', 'rgba(255, 255, 255, 0.5)']


    useEffect(() => {
        var list = JSON.parse(localStorage.getItem('researched') || '[]')
        setVideos(list)
    }, [])

    const is = (field: string, id: string) => {
        var is: any
        if (localStorage.getItem(field)) {
            let f = Array.from(JSON.parse(localStorage.getItem(field)!))
            is = f.find((checkFavorite: any) => {
                return checkFavorite.id === id
            })
        }
        return is !== undefined ? true : false
    }

    const getResearch = (event: any) => {
        if (event.code === 'Enter') { return research() }
    }

    const mount = (response: any) => {
        list = []
        response.forEach((item: any) => {
            let obj = {
                title: item.snippet.title,
                id: item.id.videoId,
                favorite: is('favorites', item.id.videoId) ? true : false,
                fcolor: is('favorites', item.id.videoId) ? colorTag[0] : colorTag[1],
                playlist: is('playlists', item.id.videoId) ? true : false,
                pcolor: is('playlists', item.id.videoId) ? colorTag[0] : colorTag[1],
            }
            list.push(obj)
        })
        return list
    }

    const research = async (page?: string) => {
        list = []
        const { items, nextPageToken, prevPageToken } = await search(keyWord, page);

        let response = Array.from(items)
        list = await mount(response)
        setNext(nextPageToken)
        if (prevPageToken) setBack(prevPageToken)
        localStorage.setItem('researched', JSON.stringify(list))
        setVideos(JSON.parse(localStorage.getItem('researched')!))
    }

    const handleFavorite = (idVideo: string, favoriteVideo: boolean) => {
        videos.map((video) => {
            if (video.id === idVideo) {
                video.favorite = favoriteVideo;
                video.favorite ?
                    video.fcolor = colorTag[0]
                    : video.fcolor = colorTag[1];
                setLocalStorage('favorites', video)
            }
        })
        setVideos([...videos])
    }

    const handlePlayList = (idVideo: string, playlist: boolean) => {
        videos.map((video) => {
            if (video.id === idVideo) {
                video.playlist = playlist;
                video.playlist ?
                    video.pcolor = colorTag[0]
                    : video.pcolor = colorTag[1]
                setLocalStorage('playlists', video)
            }
        })
        setVideos([...videos])
    }

    const setLocalStorage = (field: string, value: any) => {
        let list = JSON.parse(localStorage.getItem(field) || '[]')

        let color = ''
        field === 'favorites' ? color = 'fcolor' : color = 'pcolor'
        let remove = list.find((l: any) => { return l.id === value.id })
        if (remove) {
            list = removeVideo(field, JSON.parse(localStorage.getItem('favorites')!), remove.id);
        } else { list.push(value) }

        localStorage.setItem(field, JSON.stringify(list))

        videos.forEach((video: any) => {
            if (video.id === value.id) {
                if (remove) {
                    video[field] = false; video[color] = colorTag[1]
                } else {
                    video[field] = true; video[color] = colorTag[0]
                }
            }
        })
        localStorage.setItem('researched', JSON.stringify(videos))
        setVideos(JSON.parse(localStorage.getItem('researched')!))
    }

    return (
        <>
            <div style={{ background: theme.section, color: theme.font }} className="videos-container">
                <div className="header">
                    <div className={'input-area'}>
                        <input style={{ background: theme.section, color: theme.font }}
                            placeholder={'Type what you wish to find...'}
                            name='research'
                            value={keyWord}
                            onKeyPress={(e) => getResearch(e)}
                            onChange={(e) => setKeyWord(e.target.value)}
                            type="text" />
                        <button onClick={() => research()} className="icon">
                            <FontAwesomeIcon size={'lg'} color={'#2C2C2C'} rotation={90} icon={faSearch} />
                        </button>
                    </div>
                </div>
                <div className="section">
                    {videos && videos.length > 0 ? videos.map((video) => {
                        return (
                            <>
                                <div key={video.id} className="video-box">
                                    <div className="actions">
                                        <div className="icons-box">
                                            <FontAwesomeIcon onClick={() => handlePlayList(video.id, !video.playlist)} color={video.pcolor} icon={faFolderPlus} />
                                            <FontAwesomeIcon onClick={() => handleFavorite(video.id, !video.favorite)} color={video.fcolor} icon={faStar} />
                                        </div>
                                    </div>
                                    <YouTube
                                        opts={{ height: '200', width: '100%' }}
                                        id={`${video.id}`}
                                        videoId={`${video.id}`} />
                                    <span>{video.title.substring(0, 35)}{video.title.length > 35 ? '...' : ''}</span>
                                </div>
                            </>
                        )
                    }) : (
                            <div className={'empity-message'}>
                                <FontAwesomeIcon color={'#1A2EFF'} size={'2x'} icon={faInfoCircle} />
                                <span>You have to search to get results</span>
                            </div>
                        )}
                </div>
                {videos && videos.length > 0 ? (
                    <div className="page-token">
                        <div className="buttons">
                            <button style={{ background: 'unset' }} onClick={() => research(back)} >
                                <FontAwesomeIcon size={'2x'} color={theme.font} icon={faArrowAltCircleLeft} />
                            </button>
                            <button style={{ background: 'unset' }} onClick={() => research(next)}>
                                <FontAwesomeIcon size={'2x'} color={theme.font} icon={faArrowAltCircleRight} />
                            </button>
                        </div>
                    </div>
                ) : (<></>)}
            </div>
        </>
    )
}