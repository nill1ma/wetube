import React, { useContext, useEffect, useState } from 'react'
import './App.css';
import Sidebar from './components/Sidebar';
import VideosArea from './components/VideosArea';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Favorites from './components/VideosArea/Favorites';
import Playlists from './components/VideosArea/Playlists';
import ThemeContext from './context'
import context from './context';

export default function App() {

  // var themes = [
  //   {
  //     sidebar: '#373737',
  //     section: '#2C2C2C'
  //   },
  //   {
  //     sidebar: '#E3E3E3',
  //     section: '#D7D7D7'
  //   }

  // ]

  // const [themes, setThemes] = useState<Theme>(new Theme())
  const [theme, setTheme] = useState(ThemeContext)


  return (
    <div className="App">
      <Router>
        <Switch>
          <div className="middle">
            <ThemeContext.Provider value={[theme, setTheme]}>
              <Sidebar />
              <Route path={'/favorites'} component={Favorites} />
              <Route path={'/playlists'} component={Playlists} />
              <Route path={'/'} exact component={VideosArea} />
            </ThemeContext.Provider>
          </div>
        </Switch>
      </Router>
    </div>
  );
}