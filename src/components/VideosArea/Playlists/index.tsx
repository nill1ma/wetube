import { faArrowAltCircleLeft, faArrowAltCircleRight, faInfoCircle, faPlusCircle, faTrashAlt, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import ThemeContext from '../../../context';
import { removeVideo } from '../../../services/Util';
import './styles.scss';

export default function Playlists() {

    const [paagination, setPagination] = useState([0, 6])
    const [playlists, setPlaylists] = useState<any>([
        {
            id: 0,
            actvive: false,
            name: ''
        }
    ])
    const [playlistItems, setPlaylistItems] = useState([{ playlistId: 0, title: '', id: '' }])
    const [theme] = useContext(ThemeContext)
    const [edit, setEdit] = useState(false)
    const [currentAba, setCurrentAba] = useState(0)
    const colorTag = ['rgb(255, 140, 0)', 'rgba(255, 255, 255, 0.5)']

    useEffect(() => {
        let l = JSON.parse(localStorage.getItem('allPlaylists') || '[]')
        setPlaylists(Array.from(l))
        let list = JSON.parse(localStorage.getItem('playlistItems') || '[]')
        setPlaylistItems(Array.from(list))
    }, [])

    const removePlaylist = (id: any) => {
        let response = removeVideo('allPlaylists', playlists, id)
        localStorage.removeItem('allPlaylists')
        localStorage.setItem('allPlaylists', JSON.stringify(response))
        setPlaylists(JSON.parse(localStorage.getItem('allPlaylists')!))
    }

    const removePlaylistItem = (id: any) => {
        let response = removeVideo('playlistItems', playlistItems, id)
        setPlaylistItems(response)
        var researched = JSON.parse(localStorage.getItem('researched')!)
        researched.map((r: any) => {
            if (r.id === id) { r.playlist = false; r.fcolor = colorTag[1] }
        })
        localStorage.setItem('researched', JSON.stringify(researched))
    }
    const handlePlaylists = (id: number) => {
        playlists.map((playlist: any) => {  
            return playlist.id === id ? playlist.active = true : playlist.active = false
        })
        setCurrentAba(id)
        localStorage.setItem('allPlaylists', JSON.stringify(playlists))
        setPlaylists(JSON.parse(localStorage.getItem('allPlaylists')!))
    }

    return (
        <>
            <div style={{ background: theme.section, color: theme.font }} className="videos-container">
                <div className="header-playlist">
                    <div className={'abas-area'}>
                        {playlists.map((playlist: any) => {
                            return (
                                <>
                                    <div
                                        style={playlist.active === true ?
                                            { backgroundColor: theme.sideBar, color: theme.font, borderColor: theme.font }
                                            : { backgroundColor: theme.section, color: theme.font, borderColor: theme.font }}
                                        onClick={() => handlePlaylists(playlist.id)} onDoubleClick={() => setEdit(true)} onBlur={() => setEdit(false)} onKeyPress={(e: any) => e.code === 'Enter' ? alert(e.target.value) : ''} contentEditable={edit} className={'aba'}>
                                        <div style={{ alignSelf: 'flex-end'}} onClick={() => removePlaylist(playlist.id)}>
                                            <FontAwesomeIcon
                                                color={theme.font}
                                                size={'xs'}
                                                icon={faWindowClose} />
                                        </div>
                                        <span>{playlist.name}</span>
                                    </div>
                                </>)
                        })}
                    </div>
                    <Link to={'create'} className="add">
                        <FontAwesomeIcon className={'icon'} color={theme.font} size={'2x'} icon={faPlusCircle} />
                        <span style={{ color: theme.font }}>Add Playlist</span>
                    </Link>
                </div>
                <div className="section">
                    {playlistItems && playlistItems.length > 0 ? playlistItems.filter((video) => currentAba === video.playlistId).slice(paagination[0], paagination[1]).map((video) => {
                        return (
                            <div key={video.id} className="video-box">
                                <div className="actions">
                                    <div className="icons-box">
                                        <FontAwesomeIcon onClick={() => removePlaylistItem(video.id)} icon={faTrashAlt} />
                                    </div>
                                </div>
                                <YouTube
                                    opts={{ height: '200', width: '100%' }}
                                    id={`${video.id}`}
                                    videoId={`${video.id}`} />
                                <span>{video.title.substring(0, 35)}{video.title.length > 35 ? '...' : ''}</span>
                            </div>
                        )
                    }) : (
                            <div className={'empity-message'}>
                                <FontAwesomeIcon color={'#1A2EFF'} size={'2x'} icon={faInfoCircle} />
                                <span>You don't have any videos in your playlist</span>
                            </div>
                        )}
                </div>
                {playlists && playlists.length > 0 ? (
                    <div className="page-token">
                        <div className="buttons">
                            <button onClick={() => setPagination([paagination[0] - 6, paagination[1] - 6])} style={{ background: 'unset' }}>
                                <FontAwesomeIcon size={'2x'} color={theme.font} icon={faArrowAltCircleLeft} />
                            </button>
                            <button onClick={() => setPagination([paagination[0] + 6, paagination[1] + 6])} style={{ background: 'unset' }}>
                                <FontAwesomeIcon size={'2x'} color={theme.font} icon={faArrowAltCircleRight} />
                            </button>
                        </div>
                    </div>
                ) : (<></>)}
            </div>
        </>
    )
}