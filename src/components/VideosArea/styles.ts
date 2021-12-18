import styled from 'styled-components'

type ContainerPorps = {
    isFavorite:boolean
}

export const Body = styled.body`
    font-size:14px;
`

export const Container = styled.div`
    width:100vw;
    font-size:16px;


    span {
        font-size:2rem;
        color:${(props:ContainerPorps)=>props.isFavorite ? '#000' : '#fff'};
    }
`