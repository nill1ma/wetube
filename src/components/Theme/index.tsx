import React, { useEffect, useState } from 'react'
import { faLightbulb, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ThemeContext from '../../context'
import './styles.scss'
import { useContext } from 'react'

export default function Theme() {

    var Obj = [
        {
            name: 'dark',
            section: '#2C2C2C',
            sideBar: '#353535',
            font: '#fff',
            iconAreaActive: '#000',
            iconAreaUnactive: '#E2E2E2',
            unactiveIcon: '#E2E2E2',
            activeIcon: "rgb(255, 140, 0)",
            themeArea: '#2C2C2C'
        },
        {
            name: 'light',
            section: '#D7D7D7',
            sideBar: '#E4E4E4',
            font: '#2c2c2c',
            iconAreaActive: '#2c2c2c',
            iconAreaUnactive: '#2c2c2c',
            unactiveIcon: '#2C2C2C',
            activeIcon: "rgb(255, 140, 0)",
            themeArea: '#D7D7D7'
        }
    ]
    const [theme, setTheme] = useContext(ThemeContext)
    const [openContainer, setOpenContainer] = useState(false)
    const [themeIcons] = useState(
        [
            { name: 'light', icon: faSun },
            { name: 'dark', icon: faMoon }
        ]
    )

    useEffect(() => {
        setTheme(localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme')!) : Obj[0])
    }, [])

    const handleTheme = (name: string) => {
        var t = Obj[0].name === name ? Obj[0] : Obj[1]
        localStorage.removeItem('theme')
        localStorage.setItem('theme', JSON.stringify(t))
        setTheme(JSON.parse(localStorage.getItem('theme')!))
    }

    const openContainerTheme = () => {
        setOpenContainer(!openContainer)
    }

    return (
        <>
            <div
                onMouseEnter={() => openContainerTheme()}
                onMouseLeave={() => openContainerTheme()}
                className="container-theme"
                style={{ display: 'flex', justifyContent: 'center', background: openContainer ? theme.section : '' }}>
                {!openContainer ? (
                    <div>
                        <FontAwesomeIcon icon={faLightbulb} color={'rgb(255, 140, 0)'} />
                    </div>
                ) : (
                        <div className="containerChooseMode">
                            {themeIcons.map((icon) => {
                                return <div
                                    onClick={() => handleTheme(icon.name)}
                                    style={icon.name === theme.name ? { border: `1px solid ${theme.iconAreaActive}`, background: theme.iconAreaActive } : { border: `1px solid ${theme.iconAreaUnactive}` }}
                                    className="iconArea">
                                    <FontAwesomeIcon color={icon.name === theme.name ? theme.activeIcon : theme.unactiveIcon} icon={icon.icon} size={'1x'} />
                                </div>
                            })}
                        </div>
                    )}
            </div>
        </>
    )
}