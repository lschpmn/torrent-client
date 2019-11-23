import AppBar from '@material-ui/core/AppBar';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import Pause from '@material-ui/icons/Pause';
import Settings from '@material-ui/icons/Settings';
import { isEqual } from 'lodash';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { Torrent } from '../types';
import AddTorrentModal from './components/AddTorrentModal';
import DeleteModal from './components/DeleteModal';
import PendingTorrentModal from './components/PendingTorrentModal';
import SettingsModal from './components/SettingsModal';
import TorrentsTable from './components/TorrentsTable';
import { deleteTorrent } from './lib/action-creators';
import { ReducerState } from './lib/types';

type Props = {
  deleteTorrent: typeof deleteTorrent,
  torrents: Torrent[],
};

type State = {
  selected: { [i: string]: boolean },
  showAddTorrent: boolean,
  showDelete: boolean,
  showSettings: boolean,
};

export class App extends React.Component<Props, State> {
  state = {
    selected: {},
    showAddTorrent: false,
    showDelete: false,
    showSettings: false,
  };

  deleteTorrents = () => {
    Object.entries(this.state.selected).forEach(([magnetLink, selected]) => {
      if (selected) {
        this.props.deleteTorrent(magnetLink);
      }
    });

    this.setState({ selected: {}, showDelete: false });
  };

  selectAll = () => {
    const selected = {};
    this.props.torrents
      .map(torrent => torrent.magnetLink)
      .forEach(magnetLink => selected[magnetLink] = true);

    if (isEqual(selected, this.state.selected)) this.setState({ selected: {} });
    else this.setState({ selected });
  };

  toggleAddTorrent = () => this.setState({ showAddTorrent: !this.state.showAddTorrent });

  toggleDelete = () => {
    if (this.state.showDelete) return this.setState({ showDelete: false });
    if (!this.props.torrents.filter(torrent => this.state.selected[torrent.magnetLink]).length) return;
    this.setState({ showDelete: !this.state.showDelete });
  };

  toggleSettings = () => this.setState({ showSettings: !this.state.showSettings });

  toggleSelected = (magnetLink: string) => {
    this.setState({
      selected: {
        ...this.state.selected,
        [magnetLink]: !this.state.selected[magnetLink],
      },
    });
  };

  render() {
    const torrents = this.props.torrents.filter(torrent => !torrent.pending);
    const pendingTorrents = this.props.torrents.filter(torrent => torrent.pending);
    const { showDelete, selected } = this.state;
    const allSelected = torrents.every(torrent => selected[torrent.magnetLink]);
    const greyOut = Object.keys(selected).every(select => !selected[select]);

    /*pendingTorrents.push({
      added: Date.now() - (Math.random() * 60 * 60 * 1000),
      pending: true,
      size: 3,
      files: [],
      name: 'awesome new torrent',
      magnetLink: 'skdfjklasdf',
    });*/

    return <div>
      <AppBar position='static' style={styles.toolbar}>
        <Toolbar>
          <IconButton style={{ color: greyOut ? grey['500'] : 'white' }}>
            <Pause/>
          </IconButton>
          <IconButton onClick={this.toggleDelete} style={{ color: greyOut ? grey['500'] : red['500'] }}>
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

      <TorrentsTable
        selected={this.state.selected}
        allSelected={allSelected}
        selectAll={this.selectAll}
        toggleSelected={this.toggleSelected}
      />

      <AddTorrentModal onClose={this.toggleAddTorrent} open={this.state.showAddTorrent}/>
      <DeleteModal
        open={showDelete}
        onClose={this.toggleDelete}
        onDelete={this.deleteTorrents}
        torrentsToDelete={showDelete ? torrents.filter(torrent => selected[torrent.magnetLink]) : undefined}
      />
      <SettingsModal onClose={this.toggleSettings} open={this.state.showSettings}/>
      {!!pendingTorrents.length &&
        <PendingTorrentModal torrent={pendingTorrents[0]} />
      }
    </div>;
  }
}

const styles = {
  dialog: {
    width: '50rem',
  },
  expandIcon: {
    fontSize: '2rem',
  },
  section: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    cursor: 'pointer',
  },
  sectionTitle: {
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'row' as 'row',
    padding: '1rem 0',
  },
  toolbar: {
    backgroundColor: green.A400,
  },
};

const ConnectedApp = connect(
  (state: ReducerState) => ({
    torrents: state.torrents,
  }),
  {
    deleteTorrent,
  }
// @ts-ignore
)(App);

export default hot(ConnectedApp);
