import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faFolderPlus,
  faInfoCircle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GenericModal from "../../components/GenericModal";
import Header from "../../components/Header";
import ModalButtons from "../../components/ModalButtons";
import VideoBox from "../../components/VideoBox";
import ThemeContext from "../../context";
import { IPlaylists } from "../../interfaces/IPlaylists";
import { Videos } from "../../interfaces/Videos";
import {
  getStorage,
  removeVideo,
  setGenericStorage,
} from "../../services/Util";
import { search } from "../../services/YoutubeApi";
import { SelectModal } from "./styles";
import "./styles.scss";

export default function VideosArea() {
  const [videos, setVideos] = useState<Videos[]>(getStorage("researched"));
  const [keyWord, setKeyWord] = useState(getStorage('keyword'));
  const [next, setNext] = useState("");
  const [back, setBack] = useState("");
  const [theme] = useContext(ThemeContext);
  const [playlistSelected, setPlaylistSelected] = useState({
    name: "",
    id: 0,
  });
  const [newPlaylistVideo, setNewPlaylistVideo] = useState({
    id: "",
    isAdded: false,
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const [playlistNames, setPlaylistNames] = useState<IPlaylists[]>(
    getStorage("allPlaylists")
  );
  var list: Videos[] = [];

  const colorTag = ["rgba(255, 255, 255, 0.5)", "rgb(255, 140, 0)"];

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setVideos(getStorage("researched"));
    setPlaylistNames(getStorage("allPlaylists"));
  }, []);

  useEffect(() => {
    if (
      isOpen &&
      getStorage("allPlaylists") &&
      getStorage("allPlaylists").length > 0
    ) {
      setPlaylistSelected({
        name: playlistNames[0].name,
        id: playlistNames[0].id,
      });
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isOpen]);

  const isFavoriteOrPlylist = (key: string, id: string) => {
    var isFOP: any;
    if (localStorage.getItem(key)) {
      let items = Array.from(localStorage.getItem(key)!);
      isFOP = items.find((FOP: any) => FOP.id === id);
    }
    return isFOP;
  };

  const getResearch = (event: any) => {
    if (event.code === "Enter") {
      return research();
    }
  };

  const mount = (response: any) => {
    list = [];
    response.forEach((item: any) => {
      let res: Videos = {
        title: item.snippet.title,
        id: item.id.videoId,
        favorite: isFavoriteOrPlylist("favorites", item.id) ? true : false,
        fcolor: isFavoriteOrPlylist("favorites", item.id)
          ? theme.activeIcon
          : theme.unactiveIcon,
        playlist: isFavoriteOrPlylist("playlistItems", item.id) ? true : false,
        pcolor: isFavoriteOrPlylist("playlistItems", item.id)
          ? theme.activeIcon
          : theme.unactiveIcon,
      };
      list.push(res);
    });
    return list;
  };

  const research = async (page?: string) => {
    list = [];
    const { items, nextPageToken, prevPageToken } = await search(keyWord, page);

    let response = Array.from(items);
    list = await mount(response);
    setNext(nextPageToken);
    if (prevPageToken) setBack(prevPageToken);
    setGenericStorage(list, "researched");
    setVideos(Array.from(getStorage("researched")));
  };

  const handleFavorite = (idVideo: string, favoriteVideo: boolean) => {
    const [yeelow, gray] = colorTag;
    const index = videos.findIndex((current: Videos) => current.id === idVideo);
    videos[index].favorite = favoriteVideo;
    videos[index].fcolor = favoriteVideo ? yeelow : gray;
    setFavoritesOrPlaylistItemsInLocalStorage("favorites", videos[index]);
    // videos.map((video) => {
    //     if (video.id === idVideo) {
    //         video.favorite = favoriteVideo
    //         video.fcolor = video.favorite ? colorTag[0] : colorTag[1]
    //         setFavoritesOrPlaylistItemsInLocalStorage('favorites', video)
    //     }
    //     return video
    // })
    setVideos([...videos]);
  };

  const handlePlayList = () => {
    if (newPlaylistVideo.id && newPlaylistVideo.id !== "") {
      videos.map((video) => {
        if (video.id === newPlaylistVideo.id) {
          video.playlist = newPlaylistVideo.isAdded;
          video.playlist
            ? (video.pcolor = colorTag[0])
            : (video.pcolor = colorTag[1]);
          let value = {
            id: newPlaylistVideo.id,
            pcolor: video.pcolor,
            playlist: video.playlist,
            title: video.title,
            playlistId: playlistSelected.id,
          };
          setFavoritesOrPlaylistItemsInLocalStorage("playlistItems", value);
          setIsOpen(false);
        }
        return video;
      });
      setVideos([...videos]);
    }
  };

  const handleNewPlaylistVideo = (id: string, isAdded: boolean) => {
    setNewPlaylistVideo({ id: id, isAdded: isAdded });
    setIsOpen(true);
  };
  const setFavoritesOrPlaylistItemsInLocalStorage = (
    key: string,
    value: any
  ) => {
    let items = getStorage(key);

    let color = "";
    const field = key === "favorites" ? (color = "favor") : (color = "pcolor");
    let fOPItemsStorage = items.find((item: any) => item.id === value.id);
    if (fOPItemsStorage) {
      items = removeVideo(key, items, fOPItemsStorage.id);
      setGenericStorage([...items], key);
    } else {
      setGenericStorage([...items, value], key);
    }

    videos.map((video: any) => {
      if (video.id === value.id && fOPItemsStorage) {
        video[key] = !fOPItemsStorage;
        video[color] = fOPItemsStorage
          ? theme.activeColor
          : theme.unactiveColor;
      }
      return video;
    });
    setGenericStorage([...videos], "researched");
    setVideos(getStorage("researched"));
  };

  const close = () => setIsOpen(false);

  const handlePlayListSelected = (value: any) => {
    const currentPlaylist = playlistNames.find(
      (playlist) => playlist.id === Number(value)
    )!;
    setPlaylistSelected(currentPlaylist);
  };

  const handleKeyword = (event: any) => {
    const { value } = event.target;
    setKeyWord(value);
    setGenericStorage(value, 'keyword')
  };

  return (
    <>
      <div
        style={{ background: theme.section, color: theme.font }}
        className="videos-container"
      >
        <Header
          keyWord={keyWord}
          getResearch={getResearch}
          handleKeyword={handleKeyword}
          research={research}
          theme={theme}
        />
        <div className="section">
          {videos && videos.length > 0 ? (
            videos.map((video: Videos) => {
              return (
                <>
                  <div key={video.id} className="video-box">
                    <VideoBox
                      main={true}
                      video={video}
                      actions={[
                        {
                          function: handleNewPlaylistVideo,
                          icon: faFolderPlus,
                        },
                        { function: handleFavorite, icon: faStar },
                      ]}
                    />
                  </div>
                  <GenericModal isOpen={isOpen} close={close}>
                    <span style={{ alignSelf: "flex-end" }}>
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "#1a2eff",
                          fontSize: "16px",
                        }}
                        to={"create"}
                      >
                        Add New Playlist
                      </Link>
                    </span>
                    <SelectModal
                      background={theme.section}
                      color={theme.font}
                      onChange={(e: any) =>
                        handlePlayListSelected(e.target.value)
                      }
                    >
                      {playlistNames && playlistNames.length > 0 ? (
                        Array.from(playlistNames).map(
                          (playlistName: IPlaylists) => {
                            return (
                              <option
                                selected={playlistName.active}
                                key={playlistName.id}
                                value={playlistName.id}
                              >
                                {playlistName.name}
                              </option>
                            );
                          }
                        )
                      ) : (
                        <option
                          value=""
                          style={{
                            display:
                              playlistSelected && playlistSelected.name === ""
                                ? "none"
                                : "",
                          }}
                        >
                          Create a Playlist
                        </option>
                      )}
                    </SelectModal>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <ModalButtons
                        handleIsOpen={close}
                        handlePlayList={handlePlayList}
                        isDisabled={isDisabled}
                      />
                    </div>
                  </GenericModal>
                </>
              );
            })
          ) : (
            <div className={"empity-message"}>
              <FontAwesomeIcon
                color={"#1A2EFF"}
                size={"2x"}
                icon={faInfoCircle}
              />
              <span>You have to search to get results</span>
            </div>
          )}
        </div>
        {videos && videos.length > 0 ? (
          <div className="page-token">
            <div className="buttons">
              <button
                style={{ background: "unset" }}
                onClick={() => research(back)}
              >
                <FontAwesomeIcon
                  style={{ width: "100%", height: "100%" }}
                  color={theme.font}
                  icon={faArrowAltCircleLeft}
                />
              </button>
              <button
                style={{ background: "unset" }}
                onClick={() => research(next)}
              >
                <FontAwesomeIcon
                  style={{ width: "100%", height: "100%" }}
                  color={theme.font}
                  icon={faArrowAltCircleRight}
                />
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
