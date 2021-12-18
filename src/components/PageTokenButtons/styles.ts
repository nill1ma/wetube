import styled from 'styled-components'

export const PageTokenContainer = styled.footer`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .buttons{
        padding-bottom:15px;
        display: flex;
        justify-content: space-between;
        width: 8%;
        button{
            background-color: #2C2C2C;
            border:none;
            outline: none;
            display: flex;
            justify-content: space-between;
            cursor: pointer;                
        }
    }
`