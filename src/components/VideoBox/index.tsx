import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import YouTube from 'react-youtube'
import { IFavorites } from '../../interfaces/IFavorites'
import { IPlaylistItems } from '../../interfaces/IPlaylistItems'
import { Videos } from '../../interfaces/Videos'
import Actions from '../Actions'
import Tooltip from '../Toolpip'
import { VideoBoxContainer, VideoBoxFooter } from './styles'

type TActions = {
    function: (id: any, isAdded: boolean) => void
    icon: IconDefinition
}

type TVideo = IPlaylistItems | IFavorites | Videos

type VideoBoxProps = {
    video: TVideo
    actions: TActions[]
    main?: Boolean
}

export default function VideoBox(props: VideoBoxProps) {
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
                    {actions.map((action: TActions) =>
                        <Actions video={video} action={action} />
                    )}
                </div>
            </VideoBoxFooter>
        </VideoBoxContainer>

    )
}