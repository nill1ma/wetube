import React, { useContext } from "react"
import Modal from "react-modal"
import ThemeContext from "../../context"

type GenericModalProps = {
    isOpen: boolean
    close: () => void
    children: any
}

export default function GenericModal({ isOpen, close, children }: GenericModalProps) {
    const [theme] = useContext(ThemeContext)
    return <>
        <Modal
            isOpen={isOpen}
            onRequestClose={close}
            ariaHideApp={false}
            style={{
                overlay: {
                    backgroundColor: theme.sideBar,
                    width: '35vw',
                    margin: 'auto',
                    opacity: '40%',
                    height: '260px',
                    borderRadius: '10px'
                },
                content: {
                    background: theme.sideBar,
                    overflow: "auto",
                    WebkitOverflowScrolling: "touch",
                    borderRadius: "4px",
                    outline: "none",
                    border: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: theme.font,
                    fontSize: '18px',
                }
            }}
        >{children}</Modal>
    </>
}
