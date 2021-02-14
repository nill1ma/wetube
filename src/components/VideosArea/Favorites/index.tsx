import { faArrowAltCircleLeft, faArrowAltCircleRight, faInfoCircle, faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import ThemeContext from '../../../context';
import { IFavorites } from '../../../interfaces/IFavorites';
import { getStorage, removeVideo, setGenericStorage } from '../../../services/Util';
import Actions from '../Item/Actions';
import VideoBox from '../Item/VideoBox';
import './styles.scss';

export default function Favorites() {

    const [keyWord, setKeyWord] = useState('')
    const [paagination, setPagination] = useState([0, 6])
    const [favorites, setFavorites] = useState<IFavorites[]>(getStorage('favorites'))
    const [theme] = useContext(ThemeContext)
    const colorTag = ['rgb(255, 140, 0)', 'rgba(255, 255, 255, 0.5)']

    const removeFavorite = (id: any) => {
        let response = removeVideo('favorites', favorites, id)
        setFavorites(response)
        var researched = JSON.parse(localStorage.getItem('researched')!)
        researched.map((r: any) => {
            return r.id === id ? r.favorite = false : r.fcolor = colorTag[1]
        })
        setGenericStorage(researched, 'researched')
    }

    const getSearchFavorites = (event: any) => {
        if (event.code === 'Enter') { return searchFavorites() }
    }

    const searchFavorites = () => {
        let list = getStorage('favorites')
        if (keyWord !== '') {
            setPagination([0, 6])
            const fvrts = list.filter((favorite: any) => {
                return favorite.title.toUpperCase().includes(keyWord.toUpperCase())
            })
            return setFavorites(fvrts)
        }
        setFavorites(list)
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
                                <VideoBox video={video} />
                                <div className="actions">
                                    <Actions video={video} />
                                    <div className="icons-box">
                                        <FontAwesomeIcon onClick={() => removeFavorite(video.id)} icon={faTrashAlt} />
                                    </div>
                                </div>
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