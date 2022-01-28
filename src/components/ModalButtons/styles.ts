import styled from "styled-components";

type ButtonProps = {
    fontColor: string
    backgroundColor:string
}

export const Button = styled.button<ButtonProps>`
        margin-top: 10px;
        border-radius: 2px;
        cursor: pointer;
        font-weight: bold;
        color: ${({ fontColor }) => fontColor};
        background-color: ${({ backgroundColor }) => backgroundColor};
        width: 45%;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        outline: none;
`