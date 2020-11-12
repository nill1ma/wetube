import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube';
import './styles.scss'

export default function Favorites() {

    const [favorites, setFavorites] = useState([{ title: '', id: '' }])

    useEffect(() => {
        setFavorites([JSON.parse(localStorage.getItem('favorites')!)])
    }, [])


    return (
        <>
            <div className="videos-container">
                <div className="section">
                    {favorites.map((favorite) => {
                        return <>
                            <div className="video-box">
                                <YouTube
                                    opts={{ height: '150', width: '100%' }}
                                    id={`${favorite.id}`}
                                    videoId={`${favorite.id}`} />
                                <span>{favorite.title.substring(0, 35)}{favorite.title.length > 35 ? '...' : ''}</span>
                            </div>
                        </>
                    })}
                </div>
            </div>
        </>
    )
}