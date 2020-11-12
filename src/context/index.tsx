import { createContext } from 'react';

const ThemeContext = createContext<any>({
    name:'',
    section: '',
    sideBar: '',
    font: '',
    iconAreaActive: '',
    iconAreaUnactive: '',
    unactiveIcon: '',
    activeIcon: ''
});

export default ThemeContext;