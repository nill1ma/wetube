import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import ThemeContext from '../../../context'
import './styles.scss'
import { getStorage, redirect, setGenericStorage } from '../../../services/Util'
import { IPlaylists } from '../../../interfaces/IPlaylists'


export default function Create() {
    const [allPlaylists, setAllPlaylists] = useState<IPlaylists>({
        id: 0,
        active: false,
        name: ''
    })
    const [theme] = useContext(ThemeContext)
    let history = useHistory();

    const createANewPlaylist = () => {
        setGenericStorage([...getStorage('allPlaylists'), allPlaylists], 'allPlaylists')
        redirect(history, 'playlists')
    }
    return (
        <>
            <div style={{ background: theme.section, color: theme.font }} className="container-create">
                <div className="header">
                </div>
                <div className={'section-create'}>
                    <div style={{ background: theme.sideBar }} className={'input-create'}>
                        <div style={{
                            background: theme.sideBar,
                            borderColor: theme.section
                        }} className="container">
                            <input style={{ color: theme.font }} placeholder={'Create a new Playlist'} id={'create'}
                                value={allPlaylists.name} onKeyPress={(e: any) => e.code === 'Enter' ? createANewPlaylist() : ''}
                                onChange={(e) => setAllPlaylists({
                                    id: Math.random(),
                                    active: false,
                                    name: e.currentTarget.value
                                }
                                )} type="text" />
                            <div
                                onClick={() => createANewPlaylist()}
                                style={{
                                    backgroundColor: theme.section,
                                    padding: '10px',
                                    borderBottomColor: theme.section
                                }} className="icon">
                                <FontAwesomeIcon color={theme.font}
                                    size={'2x'}
                                    icon={faPlus} />
                            </div>
                        </div>
                    </div>
                    <Link style={{ background: theme.sideBar, color: theme.font, fontWeight: 'bolder' }} className="viewPlaylisys" to="playlists">
                        <span>Click to view your playlists</span>
                    </Link>

                </div>
            </div>
        </>

    )
}