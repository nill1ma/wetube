import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import VideosArea from './pages/VideosArea';
import Playlists from './pages/Playlists';
import Create from './pages/Playlists/Create';
import ThemeContext from './context';
import Favorites from './pages/Favorites';

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