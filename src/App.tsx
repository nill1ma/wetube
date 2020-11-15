import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Sidebar from './components/Sidebar';
import VideosArea from './components/VideosArea';
import Favorites from './components/VideosArea/Favorites';
import Playlists from './components/VideosArea/Playlists';
import ThemeContext from './context';

export default function App() {

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