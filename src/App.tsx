import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import VideosArea from './components/VideosArea';
import Favorites from './components/VideosArea/Favorites';
import Playlists from './components/VideosArea/Playlists';
import Create from './components/VideosArea/Playlists/Create';
import ThemeContext from './context';

export default function App() {

  const [theme, setTheme] = useState(ThemeContext)

  return (
    <div className="App">
      <Router>
        <ThemeContext.Provider value={[theme, setTheme]}>
          <Switch>
            <div className="middle">
              <Sidebar />
              <Route path={'/favorites'} component={Favorites} />
              <Route path={'/create'} component={Create} />
              <Route path={'/playlists'} component={Playlists} />
              <Route path={'/'} exact component={VideosArea} />
            </div>
          </Switch>
        </ThemeContext.Provider>
      </Router>
    </div>
  );
}