import React from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EMContainer } from "./styles";

type EmpityMessageProps = {
    message: string
}

export default function EmpityMessage(props: EmpityMessageProps) {
    const { message } = props
    return (
        <EMContainer>
            <FontAwesomeIcon color={'#1A2EFF'} size={'2x'} icon={faInfoCircle} />
            <span>{message}</span>
        </EMContainer>
    )
}
