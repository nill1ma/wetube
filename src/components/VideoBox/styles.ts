import styled from 'styled-components'

export const VideoBoxContainer = styled.div`
    display: flex;
    flex-direction:column;
    box-sizing:border-box;
    .youtube {
        width: 100%;
        height: 100%;
    }
`
export const VideoBoxFooter = styled.div`
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        span {
            display: flex;
            width: 85%;
            font-size: 1vw;
        }
        .tooltip {
            color: #2c2c2c;
            font-weight: bolder;
        }
        .icons-box-main-page {
            width: 15%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            cursor: pointer;
        }
        .icons-box-favorites-and-playlists {
            width: 15%;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            cursor: pointer;
        }
`