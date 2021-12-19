import { faArrowAltCircleLeft, faArrowAltCircleRight, faFolderPlus, faInfoCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import Modal from "react-modal";
import { Link } from 'react-router-dom';
import ThemeContext from '../../context';
import { IPlaylists } from "../../interfaces/IPlaylists";
import { Videos } from '../../interfaces/Videos';
import { getStorage, removeVideo, setGenericStorage } from '../../services/Util';
import { search } from '../../services/YoutubeApi';
import Header from "../shared/Header";
import VideoBox from '../shared/VideoBox';
import './styles.scss';

export default function VideosArea() {

    const [videos, setVideos] = useState<Videos[]>(getStorage('researched'))
    const [keyWord, setKeyWord] = useState('')
    const [next, setNext] = useState('')
    const [back, setBack] = useState('')
    const [theme] = useContext(ThemeContext)
    const [playlistSelected, setPlaylistSelected] = useState({
        name: '',
        id: 0
    })
    const [newPlaylistVideo, setNewPlaylistVideo] = useState({
        id: '',
        isAdded: false
    })
    const [isDisabled, setIsDisabled] = useState(false)
    const [playlistNames, setPlaylistNames] = useState<IPlaylists[]>(getStorage('allPlaylists'))
    var list: Videos[] = []

    const colorTag = [
        'rgb(255, 140, 0)',
        'rgba(255, 255, 255, 0.5)'
    ]

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setVideos(getStorage('researched'))
        setPlaylistNames(getStorage(('allPlaylists')))
    }, [])

    useEffect(() => {
        if (isOpen && (getStorage('allPlaylists') && getStorage('allPlaylists').length > 0)) {
            setPlaylistSelected({ name: playlistNames[0].name, id: playlistNames[0].id })
            setIsDisabled(false)
        }
        else { setIsDisabled(true) }
    }, [isOpen])

    useEffect(() => {
        console.log(playlistSelected['id'])
    }, [playlistSelected])

    const isFavoriteOrPlylist = (field: string, id: string) => {
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
                favorite: isFavoriteOrPlylist('favorites', item.id.videoId) ? true : false,
                fcolor: isFavoriteOrPlylist('favorites', item.id.videoId) ? theme.activeIcon : theme.unactiveIcon,
                playlist: isFavoriteOrPlylist('playlistItems', item.id.videoId) ? true : false,
                pcolor: isFavoriteOrPlylist('playlistItems', item.id.videoId) ? theme.activeIcon : theme.unactiveIcon,
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
        setGenericStorage(list, 'researched')
        setVideos(Array.from(getStorage('researched')))
    }

    const handleFavorite = (idVideo: string, favoriteVideo: boolean) => {
        videos.map((video) => {
            if (video.id === idVideo) {
                video.favorite = favoriteVideo
                video.fcolor = video.favorite ? colorTag[0] : colorTag[1]
                setFavoritesOrPlaylistItemsInLocalStorage('favorites', video)
            }
            return video
        })
        setVideos([...videos])
    }

    const handlePlayList = (idVideo: string, playlist: boolean) => {
        if (idVideo && idVideo !== '') {
            videos.map((video) => {
                if (video.id === idVideo) {
                    video.playlist = playlist
                    video.playlist ?
                        video.pcolor = colorTag[0]
                        : video.pcolor = colorTag[1]
                    let value = {
                        id: idVideo,
                        pcolor: video.pcolor,
                        playlist: video.playlist,
                        title: video.title,
                        playlistId: playlistSelected.id
                    }
                    setFavoritesOrPlaylistItemsInLocalStorage('playlistItems', value)
                    setIsOpen(false)
                }
                return video
            })
            setVideos([...videos])
        }
    }

    const handleNewPlaylistVideo = (id: string, isAdded: boolean) => {
        setNewPlaylistVideo({ id: id, isAdded: isAdded })
        setIsOpen(true)
    }
    const setFavoritesOrPlaylistItemsInLocalStorage = (field: string, value: any) => {
        let list = getStorage(field)

        let color = ''
        field === 'favorites' ? color = 'fcolor' : color = 'pcolor'
        let remove = list.find((l: any) => l.id === value.id)
        if (remove)
            list = removeVideo(field, JSON.parse(localStorage.getItem(field)!), remove.id);

        setGenericStorage([...list, value], field)

        videos.map((video: any) => {
            if (video.id === value.id && remove) {
                video[field] = !remove;
                video[color] = remove ? theme.unactiveColor : theme.activeColor
            }
            return video
        })
        setGenericStorage(videos, 'researched')
        setVideos(getStorage('researched'))
    }

    const close = () => setIsOpen(false)
    const handlePlayListSelected = (value: any) => {
        const currentPlaylist = playlistNames.find(playlist => playlist.id === Number(value))!
        const { active, ...newObj } = currentPlaylist
        setPlaylistSelected(newObj)
    }

    return (
        <>
            <div style={{ background: theme.section, color: theme.font }} className="videos-container">
                <Header
                    keyWord={keyWord}
                    getResearch={getResearch}
                    setKeyWord={setKeyWord}
                    research={research}
                    theme={theme}
                />
                <div className="section">
                    {videos && videos.length > 0 ? videos.map((video) => {
                        return (
                            <>
                                <div key={video.id} className="video-box">
                                    <VideoBox main={true} video={video} actions={
                                        [
                                            { function: handleNewPlaylistVideo, icon: faFolderPlus },
                                            { function: handleFavorite, icon: faStar }
                                        ]}
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
                                        onChange={(e: any) => handlePlayListSelected(e.target.value)}
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
                                        <option value="" style={{ display: playlistSelected && playlistSelected.name === '' ? 'none' : '' }}>Choose a Playlist</option>
                                        {playlistNames && playlistNames.length > 0 ?
                                            Array.from(playlistNames).map((playlistName: IPlaylists) => {
                                                return (
                                                    <option key={playlistName.id} value={playlistName.id}>{playlistName.name}</option>
                                                )
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
                                            disabled={isDisabled}
                                            onClick={() => handlePlayList(newPlaylistVideo.id, newPlaylistVideo.isAdded)}
                                            style={{
                                                marginTop: '10px',
                                                borderRadius: '2px',
                                                cursor: !isDisabled ? 'pointer' : '',
                                                fontWeight: 'bold',
                                                color: !isDisabled ? theme.font : 'rgba(255,255,255,0.3)',
                                                backgroundColor: !isDisabled ? '#1a2eff' : 'rgba(255,255,255,0.1)',
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