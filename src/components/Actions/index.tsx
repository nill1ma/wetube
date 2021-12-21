import React, { useContext } from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IFavorites } from "../../interfaces/IFavorites";
import { IPlaylistItems } from "../../interfaces/IPlaylistItems";
import { Videos } from "../../interfaces/Videos";
import ThemeContext from "../../context";

type TActions = {
    function: (id: any, isAdded: boolean) => void
    icon: IconDefinition
}

type TVideo = IPlaylistItems | IFavorites | Videos

// type Icons = 'folder-plus' 
type ActionsProps = {
    video: TVideo
    action: TActions
}

export default function Actions(props: ActionsProps) {
    const [theme] = useContext(ThemeContext)
    const { video, action } = props

    const isFavoriteOrPlaylistIcon = (iconName: string) => {
        if ('star' === iconName)
            return !video['favorite']
        else if ('folder-plus' === iconName)
            return !video['playlist']
        return false
    }

    const isFoPIcon = isFavoriteOrPlaylistIcon(action.icon.iconName)

    return (
        <FontAwesomeIcon onClick={() =>
            action.function(video.id, isFoPIcon)}
            color={isFoPIcon ? theme.activeIcon : theme.unactiveIcon}
            icon={action.icon} />
    )
}
