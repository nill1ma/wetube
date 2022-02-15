import styled from "styled-components";
import Modal from "react-modal";

type ContainerModalProps = {
  backgroundColor: string;
  fontColor: string;
};

export const ContainerModal = styled(Modal)<ContainerModalProps>`
  .modal {
    background-color: ${({ backgroundColor }) => backgroundColor};
    overflow: auto;
    webkitoverflowscrolling: touch;
    borderradius: 4px;
    outline: none;
    border: none;
    display: flex;
    flexdirection: column;
    justifycontent: center;
    alignitems: center;
    color: ${({ fontColor }) => fontColor};
    fontsize: 18px;
  }

  .overlay {
    background-color: ${({ backgroundColor }) => backgroundColor};
    width: 35vw;
    margin: auto;
    opacity: 40%;
    height: 260px;
    borderradius: 10px;
  }
`;
