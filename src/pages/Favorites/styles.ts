import styled from 'styled-components'

type VideosContainerProps = {
    color:string
    background:string
}

export const VideosContainer = styled.section`
    padding: 0;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    width: 80vw;
    height: 100vh;
    color: ${(props:VideosContainerProps) => props.color};
    background-color: ${(props:VideosContainerProps) => props.background};
    
    .section{
        width: 100%;
        padding: 0 0 0 20px;
        display: flex;
        flex-wrap: wrap;
        height: 80vh;
        artivle{
            width: 30%;
            height: 30%;
            flex-direction: column;
            margin: 0 10px;
            .actions{
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                .icons-box{
                    cursor: pointer;
                }
            }
        }
    }
    .header{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 10vh;
        padding-top: 20px;
        .input-area{
            display: flex;
            width: 70%;
            border-bottom: 1px solid #fff;
            .icon{
                padding: 10px 20px;
                background-color: rgba(255,255,255, 0.5);
                border:none;
                outline: none;
                cursor: pointer !important;
            }
            input{
                font-size: 18px;
                padding: 0 10px;
                border: 0;
                outline: none;
                width: 100%;
            }
        }
    }
`

export const SingleVideoArea = styled.div`
    width: 100%;
    padding: 0 0 0 20px;
    display: flex;
    flex-wrap: wrap;
    height: 80vh;

    article {
        width: 30%;
        height: 30%;
        flex-direction: column;
        margin: 0 10px;
    }
`