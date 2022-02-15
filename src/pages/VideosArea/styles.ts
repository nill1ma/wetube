import { Link } from "react-router-dom";
import styled from "styled-components";

type ContainerPorps = {
  isFavorite: boolean;
};

type SelectProps = {
  background: string;
  color: string;
};

export const AddNewPlaylist = styled(Link)`
  text-decoration: none;
  color: #1a2eff;
  font-size: 16px;
`;

export const Body = styled.body`
  font-size: 14px;
`;

export const Container = styled.div`
  width: 100vw;
  font-size: 16px;

  span {
    font-size: 2rem;
    color: ${(props: ContainerPorps) => (props.isFavorite ? "#000" : "#fff")};
  }
`;

export const SelectModal = styled.select`
  margintop: 10px;
  width: 100%;
  fontsize: 16px;
  outline: none;
  padding: 20px;
  opacity: 100%;
  backgroundcolor: ${(props: SelectProps) => props.background};
  color: ${(props: SelectProps) => props.color};
`;
