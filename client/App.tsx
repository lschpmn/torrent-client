import * as React from 'react';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import { green } from '@material-ui/core/colors/';
import Add from '@material-ui/icons/Add';
import { Torrent } from '../types';
import TorrentItem from './components/TorrentItem';

const torrents: Torrent[] = [
  {
    name: 'Last Week Tonight',
    size: 36923,
  },
  {
    name: 'Colbert Report',
    size: 85349302,
  },
];

export default class App extends React.Component {
  render() {
    return <div>
      <AppBar position='static' style={{ backgroundColor: green.A400 }}>
        <Toolbar>
          <Button style={{ color: 'white', }}>
            <Add /> Add Torrent
          </Button>
        </Toolbar>
      </AppBar>
      {torrents.map((torrent, i) => <TorrentItem key={i} torrent={torrent}/>)}
    </div>;
  }
}