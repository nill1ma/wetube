import React, { Dispatch, SetStateAction } from "react";
import { faArrowAltCircleLeft, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PageTokenContainer } from "./styles";

type PageTokenButtonsProps = {
    setPagination: Dispatch<SetStateAction<number[]>>
    pagination: number[]
    font: string
}

export default function PageTokenButtons(props: PageTokenButtonsProps) {
    const { setPagination, pagination, font } = props
    return (
        <PageTokenContainer>
            <div className="buttons">
                <button onClick={() => setPagination([pagination[0] - 6, pagination[1] - 6])} style={{ background: 'unset' }}>
                    <FontAwesomeIcon size={'2x'} color={font} icon={faArrowAltCircleLeft} />
                </button>
                <button onClick={() => setPagination([pagination[0] + 6, pagination[1] + 6])} style={{ background: 'unset' }}>
                    <FontAwesomeIcon size={'2x'} color={font} icon={faArrowAltCircleRight} />
                </button>
            </div>
        </PageTokenContainer>
    )
}
