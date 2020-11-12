import React, { useContext, useState } from 'react'
import './styles.scss'
import { faHome, faStar, faCogs, faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../../assets/logo-wetube.png'
import { Link } from 'react-router-dom';
import ThemeContext from '../../context'
import Theme from '../Theme';

const menu = [
    { title: 'Home', icon: faHome, isize: 'lg', link: '/' },
    { title: 'Favorite', icon: faStar, isize: 'lg', link: 'favorites' },
    { title: 'Playlists', icon: faTasks, isize: 'lg', link: 'playlists' },
    { title: 'Settings', icon: faCogs, isize: 'lg', link: '/' }
]

export default function Sidebar() {

    const [theme, setTheme] = useContext(ThemeContext)
    const [hover, setHover] = useState(
        { active: false, id: '' }
    )

    return (
        <>
            <div style={{ background: theme.sideBar }} className="sidebar-container">
                <Link to={'/'}>
                    <div className="logo">
                        <img src={logo} alt="" />
                    </div>
                </Link>
                <div className="menu">
                    <ul>
                        {menu.map((mn) => {
                            return <Link key={mn.title} style={{ color: theme.font, textDecoration: 'none' }} to={mn.link}>
                                <li style={hover.active && hover.id === mn.title ? { background: theme.section } : { background: theme.sideBar }} onMouseEnter={() => setHover({ active: true, id: mn.title })} onMouseLeave={() => setHover({ active: false, id: '' })} >
                                    <div className={'icon'}>
                                        <FontAwesomeIcon size={"lg"} icon={mn.icon} />
                                    </div>
                                    <span>{mn.title}</span>
                                </li>
                            </Link>
                        })}
                    </ul>
                </div>
                <Theme />
            </div>
        </>
    )
}