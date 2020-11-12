import React, { useState, useContext } from 'react'
import { Videos } from '../../interfaces/Videos'
import './styles.scss'
import { search } from '../../services/HandleApi'
import { faSearch, faStar, faFolderPlus, faArrowAltCircleLeft, faArrowAltCircleRight, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import YouTube from 'react-youtube';
import ThemeContext from '../../context';

export default function VideosArea() {

    const [videos, setVideos] = useState<Videos[]>([])
    const [keyWord, setKeyWord] = useState('')
    const [next, setNext] = useState('')
    const [back, setBack] = useState('')
    const [theme, setTheme] = useContext(ThemeContext)

    var list: Videos[] = []

    const colorTag = ['rgb(255, 140, 0)', 'rgba(255, 255, 255, 0.5)']

    const isFavorite = (id: string) => {
        var isFavorite: any
        if (localStorage.getItem('favorites')) {
            let f = Array.from(JSON.parse(localStorage.getItem('favorites')!))
            isFavorite = f.find((checkFavorite: any) => {
                return checkFavorite.id === id
            })
        }
        return isFavorite !== undefined ? true : false
    }

    const research = async (page?: string) => {
        list = []
        const { items, nextPageToken, prevPageToken, pageInfo } = await search(keyWord, page);

        let response = Array.from(items)
        response.forEach((item: any) => {

            let obj = {
                title: item.snippet.title,
                id: item.id.videoId,
                favorite: isFavorite(item.id.videoId) ? true : false,
                fcolor: isFavorite(item.id.videoId) ? colorTag[0] : colorTag[1],
                playlist: false,
                pcolor: colorTag[1]
            }
            list.push(obj)
        })
        setNext(nextPageToken)
        if (prevPageToken) setBack(prevPageToken)
        setVideos([...list])
    }

    const addfavorite = (idVideo: string, favoriteVideo: boolean) => {
        videos.map((video) => {
            if (video.id === idVideo) {
                video.favorite = favoriteVideo;
                video.favorite ?
                    video.fcolor = colorTag[0]
                    : video.fcolor = colorTag[1]
                setLocalStorage('favorites', JSON.stringify(video))
            }
        })
        setVideos([...videos])
    }

    const addPlayList = (idVideo: string, playlist: boolean) => {
        videos.map((video) => {
            if (video.id === idVideo) {
                video.playlist = playlist;
                video.playlist ?
                    video.pcolor = colorTag[0]
                    : video.pcolor = colorTag[1]
                setLocalStorage('playlists', JSON.stringify(video))
            }
        })
        setVideos([...videos])
    }

    const setLocalStorage = (field: string, value: any) => {
        field === 'favorites' ? localStorage.setItem('favorites', value)
            : localStorage.setItem('playlists', value)
    }

    return (
        <>
            <div style={{ background: theme.section, color:theme.font }} className="videos-container">
                <div className="header">
                    <div className={'input-area'}>
                        <input style={{ background: theme.section, color:theme.font }} placeholder={'Type what you wish to find...'} name='research' value={keyWord} onChange={(e) => setKeyWord(e.target.value)} type="text" />
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
                                            <FontAwesomeIcon onClick={() => addPlayList(video.id, !video.playlist)} color={video.pcolor} icon={faFolderPlus} />
                                            <FontAwesomeIcon onClick={() => addfavorite(video.id, !video.favorite)} color={video.fcolor} icon={faStar} />
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
                            <button style={{background:'unset'}} onClick={() => research(back)} >
                                <FontAwesomeIcon size={'2x'} color={theme.font} icon={faArrowAltCircleLeft} />
                            </button>
                            <button style={{background:'unset'}} onClick={() => research(next)}>
                                <FontAwesomeIcon size={'2x'} color={theme.font} icon={faArrowAltCircleRight} />
                            </button>
                        </div>
                    </div>
                ) : (<></>)}
            </div>
        </>
    )
}