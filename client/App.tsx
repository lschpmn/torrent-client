import AppBar from '@material-ui/core/AppBar/AppBar';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List/List';
import Paper from '@material-ui/core/Paper/Paper';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import Pause from '@material-ui/icons/Pause';
import Play from '@material-ui/icons/PlayArrow';
import * as React from 'react';
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
      <AppBar position='static' style={styles.toolbar}>
        <Toolbar>
          <IconButton style={{ color: 'white' }}>
            <Add/>
          </IconButton>
          <IconButton style={{ color: red['500'] }}>
            <Delete/>
          </IconButton>
          <IconButton style={{ color: 'white' }}>
            <Pause/>
          </IconButton>
          <IconButton style={{ color: 'white' }}>
            <Play/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Paper style={styles.sectionTitle}>
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
  sectionTitle: {
    borderRadius: 0,
    padding: '1rem',
  },
  toolbar: {
    backgroundColor: green.A400,
  },
};