import AppBar from '@material-ui/core/AppBar/AppBar';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
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

type State = {
  selected: { [i: number]: boolean },
};

export default class App extends React.Component<{}, State> {
  state = {
    selected: {},
  };

  toggleSelected = (i: number) => {
    this.setState({
      selected: {
        ...this.state.selected,
        [i]: !this.state.selected[i],
      },
    });
  };

  render() {
    const { selected } = this.state;
    const greyOut = Object.keys(selected).every(select => !selected[select]);
    console.log(this.state);

    return <div>
      <AppBar position='static' style={styles.toolbar}>
        <Toolbar>
          <IconButton style={{ color: 'white' }}>
            <Add/>
          </IconButton>
          <div style={{ flexGrow: 1 }} />
          <IconButton style={{ color: greyOut ? grey['500'] : red['500'] }}>
            <Delete/>
          </IconButton>
          <IconButton style={{ color: greyOut ? grey['500'] : 'white' }}>
            <Pause/>
          </IconButton>
          <IconButton style={{ color: greyOut ? grey['500'] : 'white' }}>
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
            onPress={() => this.toggleSelected(i)}
            selected={!!selected[i]}
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