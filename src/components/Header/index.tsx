import React from 'react'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './styles.scss'
import { ITheme } from '../../interfaces/ITheme';


type HeaderProps = {
    keyWord: string
    getResearch: (event : any) => void
    handleKeyword: (event : any) => void
    research: () => void
    theme: ITheme
}


export default function Header(props: HeaderProps) {
    const { keyWord, getResearch, handleKeyword, research, theme } = props
    return (
            <div className="header">
                <div className="header">
                    <div className={'input-area'}>
                        <input data-testid="input-field-research" style={{ background: theme.section, color: theme.font }}
                            placeholder={'Type what you wish to find...'}
                            name='research'
                            value={keyWord}
                            onKeyPress={(e) => getResearch(e)}
                            onChange={(e) => handleKeyword(e)}
                            type="text" />
                        <button data-testid="button-field" onClick={() => research()} className="icon">
                            <FontAwesomeIcon size={'lg'} color={'#2C2C2C'} rotation={90} icon={faSearch} />
                        </button>
                    </div>
                </div>
            </div>
    )
}