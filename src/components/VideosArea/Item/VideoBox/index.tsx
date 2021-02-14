import React from 'react'
import YouTube from 'react-youtube'
import './styles.scss'

export default function VideoBox(props:any) {
    return <YouTube
        opts={{ height: '180', width: '100%' }}
        id={`${props.video.id}`}
        videoId={`${props.video.id}`} />
}