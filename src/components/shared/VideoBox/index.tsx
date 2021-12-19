import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import YouTube from 'react-youtube'
import ThemeContext from '../../../context'
import Tooltip from '../Toolpip'
import './styles.scss'

export default function VideoBox(props: any) {
    const [theme] = useContext(ThemeContext)
    const { video, actions, main } = props

    return (
        <div className="video-box-container">
            <YouTube
                opts={{ height: '180', width: '100%' }}
                id={`${video.id}`}
                videoId={`${video.id}`} />
            <div className="video-box-footer">
                <Tooltip video={video} />
                <div className={main ? "icons-box-main-page" : "icons-box-favorites-and-playlists"}>
                    {actions.map((action: any) => {
                        return (
                            <FontAwesomeIcon onClick={() => { action.function(video.id, !video.playlist) }} color={video.playlist ? theme.activeIcon : theme.unactiveIcon} icon={action.icon} />
                        )
                    })}
                </div>
            </div>
        </div >

    )
}