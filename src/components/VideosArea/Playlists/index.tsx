import { faArrowAltCircleLeft, faArrowAltCircleRight, faInfoCircle, faPlusCircle, faTrashAlt, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import ThemeContext from '../../../context';
import { IPlaylistItems } from '../../../interfaces/IPlaylistItems';
import { IPlaylists } from '../../../interfaces/IPlaylists';
import { getStorage, removeVideo, setGenericStorage, updateResearchedIconPLaylist } from '../../../services/Util';
import Actions from '../../shared/Actions';
import VideoBox from '../../shared/VideoBox';
import './styles.scss';

export default function Playlists() {

    const [paagination, setPagination] = useState([0, 6])
    const [playlists, setPlaylists] = useState<IPlaylists[]>(getStorage('allPlaylists'))
    const [playlistItems, setPlaylistItems] = useState<IPlaylistItems[]>(getStorage('playlistItems'))
    const [theme] = useContext(ThemeContext)
    const [edit, setEdit] = useState(false)
    const [currentAba, setCurrentAba] = useState(playlists && playlists.length > 0 ? playlists[0].id : 0)
    const colorTag = ['rgb(255, 140, 0)', 'rgba(255, 255, 255, 0.5)']

    const removePlaylistItem = (id: string) => {
        let response = removeVideo('playlistItems', playlistItems, id)
        setPlaylistItems(response)
        updateResearchedIconPLaylist(id, colorTag[1])
    }
    const handlePlaylists = (id: number) => {
        playlists.map((playlist: IPlaylists) => playlist.active = playlist.id === id)
        setPlaylists(setGenericStorage(playlists, 'allPlaylists'))
        if (playlists) setCurrentAba(id)
    }

    const editPlaylistName = (index: number, newName: string) => {
        if (newName !== '') {
            playlists[index].name = newName
            setGenericStorage(playlists, 'allPlaylists')
        }
    }

    const removePlaylist = (id: number, index: number) => {
        const pItems = playlistItems.find((p) => id === p.playlistId)
        setPlaylistItems(playlistItems.filter((p) => id !== p.playlistId));
        setPlaylists(playlists.splice(index, 1))
        if (pItems) updateResearchedIconPLaylist(pItems.id, colorTag[1])
    }

    return (
        <>
            <div style={{ background: theme.section, color: theme.font }} className="videos-container">
                <div className="header-playlist">
                    <div className={'abas-area'}>
                        {currentAba && currentAba !== 0 ?playlists.map((playlist: IPlaylists, index: number) => {
                            return (
                                <>
                                    <div
                                        key={playlist.id}
                                        style={playlist.active ?
                                            { backgroundColor: theme.sideBar, color: theme.font, borderColor: theme.font }
                                            : { backgroundColor: theme.section, color: theme.font, borderColor: theme.font }}
                                        onClick={() => handlePlaylists(playlist.id)}
                                        onDoubleClick={() => setEdit(true)}
                                        onBlur={(e) => { editPlaylistName(index, e.target.innerText) }}
                                        contentEditable={edit}
                                        suppressContentEditableWarning={true}
                                        className={'aba'}
                                        onKeyPress={(e: any) => e.code === 'Enter' ? () => { setEdit(false); editPlaylistName(index, e) } : ''}
                                    >
                                        <div style={{ alignSelf: 'flex-end' }}
                                            onClick={() => removePlaylist(playlist.id, index)}>
                                            <FontAwesomeIcon
                                                color={theme.font}
                                                size={"xs"}
                                                icon={faWindowClose} />
                                        </div>
                                        <span data-tip data-for={playlist.id}>{playlist.name.substring(0, 35)}
                                            {playlist.name.length > 35 ? '...' : ''}</span>
                                        <ReactTooltip
                                            className={'tooltip'}
                                            type={'info'}
                                            textColor={'#2C2C2C'}
                                            border={true}
                                            borderColor={'#2C2C2C'}
                                            place={'right'}
                                            getContent={() => playlist.name}
                                        />
                                    </div>
                                </>)
                        }): <></>}
                    </div>
                    <Link to={'create'} className="add">
                        <FontAwesomeIcon className={'icon'} color={theme.font} size={'2x'} icon={faPlusCircle} />
                        <span style={{ color: theme.font }}>Add Playlist</span>
                    </Link>
                </div>
                <div className="section">
                    {currentAba && currentAba !== 0 ? playlistItems.filter((video) => currentAba === video.playlistId).slice(paagination[0], paagination[1]).map((video) => {
                        return (
                            <div key={video.id} className="video-box">
                                <VideoBox video={video} />
                                <div className="actions">
                                    <Actions video={video} />
                                    <div className="icons-box">
                                        <FontAwesomeIcon onClick={() => removePlaylistItem(video.id)} icon={faTrashAlt} />
                                    </div>
                                </div>
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