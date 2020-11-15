import { faInfoCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import YouTube from 'react-youtube';
import ThemeContext from '../../../context';
import { removeVideo } from '../../../services/Util'
import './styles.scss'

export default function Playlists() {

    const [playlists, setPlaylists] = useState([{ title: '', id: '' }])
    const [theme] = useContext(ThemeContext)

    useEffect(() => {
        var list = JSON.parse(localStorage.getItem('playlists') || '[]')
        setPlaylists(Array.from(list))
    }, [])

    const removeFavorite = (id: any) => {
        let response = removeVideo('playlists', playlists, id)
        setPlaylists(response)
    }

    return (
        <>
            <div style={{ background: theme.section, color: theme.font }} className="videos-container">
                <div className="header-favorite">
                </div>
                <div className="section">
                    {playlists && playlists.length > 0 ? playlists.map((video) => {
                        return (
                            <>
                                <div key={video.id} className="video-box">
                                    <div className="actions">
                                        <div className="icons-box">
                                            <FontAwesomeIcon onClick={() => removeFavorite(video.id)} icon={faTrashAlt} />
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
                                <span>You don't have any videos in your playlist</span>
                            </div>
                        )}
                </div>
            </div>
        </>
    )
}