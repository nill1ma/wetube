import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Header() {
    return (
        <>
            <div className="header-container">
                <div className="logo">
                    LOGO
                </div>
                <div className="research">
                    <div className="icon">
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                    <input type="text" />
                </div>
                <ul>
                    <li>LOGIN</li>
                    <li>SIGN UP</li>
                </ul>
            </div>
        </>
    )
}