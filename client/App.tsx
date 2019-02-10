import AppBar from '@material-ui/core/AppBar';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import Pause from '@material-ui/icons/Pause';
import Settings from '@material-ui/icons/Settings';
import * as React from 'react';
import { connect } from 'react-redux';
import { Torrent } from '../types';
import AddTorrentModal from './components/AddTorrentModal';
import SettingsModal from './components/SettingsModal';
import TorrentItem from './components/TorrentItem';
import { getState } from './lib/thunks';
import { ReducerState } from './lib/types';

type Props = {
  getState: typeof getState,
  torrents: Torrent[],
};

type State = {
  selected: { [i: number]: boolean },
  showAddTorrent: boolean,
  showSettings: boolean,
};

export class App extends React.Component<Props, State> {
  state = {
    selected: {},
    showAddTorrent: false,
    showSettings: false,
  };

  componentDidMount() {
    this.props.getState();
  }

  toggleAddTorrent = () => this.setState({ showAddTorrent: !this.state.showAddTorrent });

  toggleSettings = () => this.setState({ showSettings: !this.state.showSettings });

  toggleSelected = (i: number) => {
    this.setState({
      selected: {
        ...this.state.selected,
        [i]: !this.state.selected[i],
      },
    });
  };

  render() {
    const { torrents } = this.props;
    const { selected } = this.state;
    const greyOut = Object.keys(selected).every(select => !selected[select]);

    return <div>
      <AppBar position='static' style={styles.toolbar}>
        <Toolbar>
          <IconButton style={{ color: greyOut ? grey['500'] : 'white' }}>
            <Pause/>
          </IconButton>
          <IconButton style={{ color: greyOut ? grey['500'] : red['500'] }}>
            <Delete/>
          </IconButton>

          <div style={{ flexGrow: 1 }}/>

          <IconButton style={{ color: 'white' }} onMouseDown={this.toggleAddTorrent}>
            <Add/>
          </IconButton>
          <IconButton style={{ color: 'white' }} onClick={this.toggleSettings}>
            <Settings/>
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
      <AddTorrentModal onClose={this.toggleAddTorrent} open={this.state.showAddTorrent}/>
      <SettingsModal onClose={this.toggleSettings} open={this.state.showSettings}/>
    </div>;
  }
}

const styles = {
  dialog: {
    width: '50rem',
  },
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

export default connect(
  (state: ReducerState) => ({
    torrents: state.torrents,
  }),
  {
    getState,
  },
)(App);