import React, { useContext, useEffect, useState } from 'react'
import { faArrowAltCircleLeft, faArrowAltCircleRight, faInfoCircle, faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import YouTube from 'react-youtube';
import ThemeContext from '../../../context';
import { removeVideo } from '../../../services/Util'
import './styles.scss'

export default function Favorites() {

    const [keyWord, setKeyWord] = useState('')
    const [paagination, setPagination] = useState([0, 6])
    const [favorites, setFavorites] = useState([{ title: '', id: '' }])
    const [theme] = useContext(ThemeContext)
    const colorTag = ['rgb(255, 140, 0)', 'rgba(255, 255, 255, 0.5)']

    useEffect(() => {
        let list = JSON.parse(localStorage.getItem('favorites') || '[]')

        setFavorites(Array.from(list))
    }, [])

    const removeFavorite = (id: any) => {
        let response = removeVideo('favorites', favorites, id)
        setFavorites(response)
        var researched = JSON.parse(localStorage.getItem('researched')!)
        researched.map((r: any) => {
             if (r.id === id) { r.favorite = false; r.fcolor = colorTag[1] }
        })
        localStorage.setItem('researched', JSON.stringify(researched))
    }

    const getSearchFavorites = (event: any) => {
        if (event.code === 'Enter') { return searchFavorites() }
    }

    const searchFavorites = () => {
        let list = JSON.parse(localStorage.getItem('favorites') || '[]')
        if (keyWord !== '') {
            setPagination([0, 6])
            const fvrts = list.filter((favorite: any) => {
                return favorite.title.toUpperCase().includes(keyWord.toUpperCase())
            })
            return setFavorites(fvrts)
        }
        setFavorites(Array.from(list))
    }

    return (
        <>
            <div style={{ background: theme.section, color: theme.font }} className="videos-container">
                <div className="header">
                    <div className={'input-area'}>
                        <input style={{ background: theme.section, color: theme.font }}
                            placeholder={'Type your favorite title to find...'}
                            name='research'
                            value={keyWord}
                            onKeyPress={(e) => getSearchFavorites(e)}
                            onChange={(e) => setKeyWord(e.target.value)}
                            type="text" />
                        <button onClick={() => searchFavorites()} className="icon">
                            <FontAwesomeIcon size={'lg'} color={'#2C2C2C'} rotation={90} icon={faSearch} />
                        </button>
                    </div>
                </div>
                <div className="section">
                    {favorites && favorites.length > 0 ? favorites.slice(paagination[0], paagination[1]).map((video) => {
                        return (

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

                        )
                    }) : (
                            <div className={'empity-message'}>
                                <FontAwesomeIcon color={'#1A2EFF'} size={'2x'} icon={faInfoCircle} />
                                <span>You don't have any videos in your favorite list</span>
                            </div>
                        )}
                </div>
                {favorites && favorites.length > 0 ? (
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