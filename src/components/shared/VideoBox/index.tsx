import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import YouTube from 'react-youtube'
import ThemeContext from '../../../context'
import Tooltip from '../Toolpip'
import { IFavorites } from '../../../interfaces/IFavorites';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { IPlaylistItems } from '../../../interfaces/IPlaylistItems'
import { Videos } from '../../../interfaces/Videos'
import { VideoBoxContainer, VideoBoxFooter } from './styles'

type Actions = {
    function: (id: any, isAdded: boolean) => void
    icon: IconDefinition
}

type TVideo = IPlaylistItems | IFavorites | Videos

type VideoBoxProps = {
    video: TVideo
    actions: Actions[]
    main?: Boolean
}

export default function VideoBox(props: VideoBoxProps) {
    const [theme] = useContext(ThemeContext)
    const { video, actions, main } = props

    return (
        <VideoBoxContainer>
            <YouTube
                opts={{ height: '180', width: '100%' }}
                id={`${video.id}`}
                videoId={`${video.id}`} />
            <VideoBoxFooter>
                <Tooltip video={video} />
                <div className={main ? "icons-box-main-page" : "icons-box-favorites-and-playlists"}>
                    {actions.map((action: any) => {
                        return (
                            <FontAwesomeIcon onClick={() => { action.function(video.id, !video.playlist) }} color={video.playlist ? theme.activeIcon : theme.unactiveIcon} icon={action.icon} />
                        )
                    })}
                </div>
            </VideoBoxFooter>
        </VideoBoxContainer>

    )
}