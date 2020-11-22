import React, { useState, useContext, useEffect } from 'react'
import { faSearch, faStar, faFolderPlus, faArrowAltCircleLeft, faArrowAltCircleRight, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactTooltip from "react-tooltip"
import Modal from "react-modal"
import { Videos } from '../../interfaces/Videos'
import './styles.scss'
import { search } from '../../services/YoutubeApi'
import YouTube from 'react-youtube';
import ThemeContext from '../../context';
import { removeVideo } from '../../services/Util'
import { Link } from 'react-router-dom';

export default function VideosArea() {

    const [videos, setVideos] = useState<Videos[]>(
        localStorage.getItem('researched')
            ? JSON.parse(localStorage.getItem('researched')!) : []
    )
    const [keyWord, setKeyWord] = useState('')
    const [next, setNext] = useState('')
    const [back, setBack] = useState('')
    const [theme] = useContext(ThemeContext)
    const [playlistId, setPlaylistId] = useState(0)
    const [newPlaylistVideo, setNewPlaylistVideo] = useState({
        id: '',
        isAdded: false
    })
    const [playlistNames, setPlaylistNames] = useState<any[]>(
        localStorage.getItem('allPlaylists') ? JSON.parse(localStorage.getItem('allPlaylists')!) : []
    )

    var list: Videos[] = []

    const colorTag = [
        'rgb(255, 140, 0)',
        'rgba(255, 255, 255, 0.5)'
    ]

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        var list = JSON.parse(localStorage.getItem('researched') || '[]')
        setVideos(list)
        setPlaylistNames(JSON.parse(localStorage.getItem('allPlaylists')!) || '[]')
    }, [])

    useEffect(() => {
        if (isOpen) setPlaylistId(playlistNames[0].id)
    }, [isOpen])

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
                fcolor: is('favorites', item.id.videoId) ? theme.activeIcon : theme.unactiveIcon,
                playlist: is('playlistItems', item.id.videoId) ? true : false,
                pcolor: is('playlistItems', item.id.videoId) ? theme.activeIcon : theme.unactiveIcon,
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
        setVideos(Array.from(JSON.parse(localStorage.getItem('researched')!)))
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
        if (idVideo && idVideo !== '') {
            videos.map((video) => {
                if (video.id === idVideo) {
                    video.playlist = playlist;
                    video.playlist ?
                        video.pcolor = colorTag[0]
                        : video.pcolor = colorTag[1]

                    let value = {
                        id: idVideo,
                        pcolor: video.pcolor,
                        playlist: video.playlist,
                        title: video.title,
                        playlistId: playlistId
                    }
                    setLocalStorage('playlistItems', value)
                    setIsOpen(false)
                }
            })
            setVideos([...videos])
        }

    }

    const setLocalStorage = (field: string, value: any) => {
        let list = JSON.parse(localStorage.getItem(field) || '[]')

        let color = ''
        field === 'favorites' ? color = 'fcolor' : color = 'pcolor'
        let remove = list.find((l: any) => { return l.id === value.id })
        if (remove) {
            list = removeVideo(field, JSON.parse(localStorage.getItem(field)!), remove.id);
        } else { list.push(value) }

        localStorage.setItem(field, JSON.stringify(list))

        videos.forEach((video: any) => {
            if (video.id === value.id) {
                if (remove) {
                    video[field] = false; video[color] = theme.unactiveColor
                } else {
                    video[field] = true; video[color] = theme.activeColor
                }
            }
        })
        localStorage.setItem('researched', JSON.stringify(videos))
        setVideos(JSON.parse(localStorage.getItem('researched')!))
        if(!playlistNames || playlistNames.length < 1) setPlaylistNames([])
    }

    const close = () => {
        setIsOpen(false)
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
                                            <FontAwesomeIcon onClick={() => { setNewPlaylistVideo({ id: video.id, isAdded: !video.playlist }); setIsOpen(true) }} color={video.playlist ? theme.activeIcon : theme.unactiveIcon} icon={faFolderPlus} />
                                            <FontAwesomeIcon onClick={() => handleFavorite(video.id, !video.favorite)} color={video.favorite ? theme.activeIcon : theme.unactiveIcon} icon={faStar} />
                                        </div>
                                    </div>
                                    <YouTube
                                        opts={{ height: '180', width: '100%' }}
                                        id={`${video.id}`}
                                        videoId={`${video.id}`} />
                                    <span data-tip data-for={video.id}>{
                                        video.title.substring(0, 35)}
                                        {video.title.length > 35 ? '...' : ''}
                                    </span>
                                    <ReactTooltip
                                        id={video.id}
                                        className={'tooltip'}
                                        type={'info'}
                                        textColor={'#2C2C2C'}
                                        border={true}
                                        borderColor={'#2C2C2C'}
                                        place={'bottom'}
                                        getContent={() => video.title}
                                    />
                                </div>
                                <Modal
                                    isOpen={isOpen}
                                    onRequestClose={close}
                                    style={{
                                        overlay: {
                                            backgroundColor: theme.sideBar,
                                            width: '35vw',
                                            margin: 'auto',
                                            opacity: '40%',
                                            height: '260px',
                                            borderRadius: '10px'
                                        },
                                        content: {
                                            background: theme.sideBar,
                                            overflow: "auto",
                                            WebkitOverflowScrolling: "touch",
                                            borderRadius: "4px",
                                            outline: "none",
                                            border: 'none',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            color: theme.font,
                                            fontSize: '18px',
                                        }
                                    }}
                                >
                                    <span style={{ alignSelf: 'flex-end' }}>
                                        <Link style={{ textDecoration: 'none', color: '#1a2eff', fontSize: '16px' }} to={'create'}>
                                            Add New Playlist
                                        </Link>
                                    </span>
                                    <select
                                        onChange={(e) => setPlaylistId(Number(e.target.value))}
                                        style={{
                                            marginTop: '10px',
                                            width: '100%',
                                            fontSize: '16px',
                                            outline: 'none',
                                            padding: '20px',
                                            opacity: '100%',
                                            backgroundColor: theme.section,
                                            color: theme.font
                                        }}>
                                        <option value={''}>Choose a Playlist</option>
                                        {playlistNames && playlistNames.length > 0 ? 
                                        
                                        playlistNames.map((all: any) => {
                                            return <>
                                                <option value={all.id}> {all.name}</option>
                                            </>
                                        }) : <></>}
                                    </select>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            style={{
                                                marginTop: '10px',
                                                borderRadius: '2px',
                                                cursor: 'pointer',
                                                fontWeight: 'bold',
                                                color: theme.font,
                                                backgroundColor: '#f00',
                                                width: '45%',
                                                padding: '10px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: 'none',
                                                outline: 'none'
                                            }}>Cancel</button>
                                        <button
                                            onClick={() => handlePlayList(newPlaylistVideo.id, newPlaylistVideo.isAdded)}
                                            style={{
                                                marginTop: '10px',
                                                borderRadius: '2px',
                                                cursor: 'pointer',
                                                fontWeight: 'bold',
                                                color: theme.font,
                                                backgroundColor: '#1a2eff',
                                                width: '45%',
                                                padding: '10px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: 'none',
                                                outline: 'none'
                                            }}>Save</button>
                                    </div>
                                </Modal>
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
                                <FontAwesomeIcon style={{ width: '100%', height: '100%' }} color={theme.font} icon={faArrowAltCircleLeft} />
                            </button>
                            <button style={{ background: 'unset' }} onClick={() => research(next)}>
                                <FontAwesomeIcon style={{ width: '100%', height: '100%' }} color={theme.font} icon={faArrowAltCircleRight} />
                            </button>
                        </div>
                    </div>
                ) : (<></>)}
            </div>
        </>
    )
}