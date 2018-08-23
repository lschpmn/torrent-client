import * as React from 'react';
import { green } from '@material-ui/core/colors/';
import Add from '@material-ui/icons/Add';
import { Torrent } from '../types';
import TorrentItem from './components/TorrentItem';
import List from '@material-ui/core/List/List';
import Paper from '@material-ui/core/Paper/Paper';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Button from '@material-ui/core/Button/Button';

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
      <AppBar position='static' style={styles.toolbar}>
        <Toolbar>
          <Button style={{ color: 'white', }}>
            <Add /> Add Torrent
          </Button>
        </Toolbar>
      </AppBar>
      <Paper style={{ padding: '1rem' }}>
        <div style={styles.section}>Name</div>
        <div style={styles.section}>Size</div>
      </Paper>
      <List>
        {torrents.map((torrent, i) => (
          <TorrentItem
            key={i}
            style={styles.section}
            torrent={torrent}
          />
        ))}
      </List>
    </div>;
  }
}

const styles = {
  section: {
    display: 'inline-block',
    width: '50%',
  },
  toolbar: {
    backgroundColor: green.A400,
  },
};