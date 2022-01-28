import React, { useContext } from "react"
import ThemeContext from "../../context"
import { Button } from "./styles"

type ModalButtonsProps = {
    handleIsOpen: () => void
    handlePlayList: () => void
    isDisabled: boolean
}


type ButtonListProps = {
    label: string
    color: string
    backgroundColor: string
    handleFunction: () => void
}

export default function ModalButtons({ handleIsOpen, handlePlayList, isDisabled }: ModalButtonsProps) {

    const [theme] = useContext(ThemeContext)

    const buttons: ButtonListProps[] = [
        {
            label: `Cancel`, color: theme.font, backgroundColor: `#f00`,
            handleFunction: handleIsOpen
        },
        {
            label: `Save`,
            color: !isDisabled ? theme.font : 'rgba(255,255,255,0.3)',
            backgroundColor: !isDisabled ? '#1a2eff' : 'rgba(255,255,255,0.1)',
            handleFunction: handlePlayList
        }
    ]

    return <>
        {buttons.map(({ color, backgroundColor, handleFunction, label }: ButtonListProps) =>
            <Button fontColor={color}
                backgroundColor={backgroundColor}
                onClick={() => handleFunction()}>
                {label}
            </Button>
        )}
    </>
}
