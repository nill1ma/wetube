import React, { useContext, useState } from 'react';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Header } from 'semantic-ui-react';
import { IFavorites } from '../../interfaces/IFavorites';
import { getStorage, removeVideo, setGenericStorage } from '../../services/Util';
import { SingleVideoArea, VideosContainer } from './styles';
import EmpityMessage from '../../components/EmpityMessage';
import PageTokenButtons from '../../components/PageTokenButtons';
import VideoBox from '../../components/shared/VideoBox';
import ThemeContext from '../../context';
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
        var researched = getStorage('researched')
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
            const updatedFavorites = list.filter((favorite: any) => {
                return favorite.title.toUpperCase().includes(keyWord.toUpperCase())
            })
            return setFavorites(updatedFavorites)
        }
        setFavorites(list)
    }

    const favoriteList = () =>{
        if (favorites && favorites.length > 0)
            return favorites.slice(paagination[0], paagination[1])
        return []
    }


    return (
        <VideosContainer background={theme.section} color={theme.font}>
            <Header
                keyWord={keyWord}
                getResearch={getSearchFavorites}
                setKeyWord={setKeyWord}
                research={searchFavorites}
                theme={theme}
            />
            <SingleVideoArea>
                {favoriteList() ? favoriteList().map((video) => {
                    return (
                        <article key={video.id} className="video-box">
                            <VideoBox main={false} video={video} actions={
                                [{ function: removeFavorite, icon: faTrashAlt }]}
                            />
                        </article>
                    )
                }) : (
                    <EmpityMessage message={'You don`t have any videos in your favorite list'} />
                )}
            </SingleVideoArea>
            {favorites && favorites.length > 0 ? (
                <PageTokenButtons
                setPagination={setPagination}
                pagination={paagination}
                font={theme.font} />
            ) : (<></>)}
        </VideosContainer>
    )
}