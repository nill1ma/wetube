import React from 'react'
import ReactTooltip from 'react-tooltip'

export default function Tooltip(props: any) {
    const { video } = props
    return (
        <>
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
                place={'right'}
                getContent={() => video.title}
            />
        </>
    )
}