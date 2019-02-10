import AppBar from '@material-ui/core/AppBar';
import Checkbox from '@material-ui/core/Checkbox';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Pause from '@material-ui/icons/Pause';
import Settings from '@material-ui/icons/Settings';
import { isEqual } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { Torrent } from '../types';
import AddTorrentModal from './components/AddTorrentModal';
import SettingsModal from './components/SettingsModal';
import TorrentItem from './components/TorrentItem';
import { deleteTorrent, getState } from './lib/thunks';
import { ReducerState } from './lib/types';

type Props = {
  deleteTorrent: typeof deleteTorrent,
  getState: typeof getState,
  torrents: Torrent[],
};

type State = {
  selected: { [i: string]: boolean },
  showAddTorrent: boolean,
  showSettings: boolean,
  sort: string,
  sortAscending: boolean,
};

export class App extends React.Component<Props, State> {
  state = {
    selected: {},
    showAddTorrent: false,
    showSettings: false,
    sort: 'added',
    sortAscending: false,
  };

  componentDidMount() {
    this.props.getState();
  }

  changeSort = (sort: string) => {
    if (this.state.sort === sort) this.setState({ sortAscending: !this.state.sortAscending });
    else this.setState({ sort, sortAscending: false });
  };

  deleteTorrents = () => {
    Object.entries(this.state.selected).forEach(([magnetLink, selected]) => {
      if (selected) {
        this.props.deleteTorrent(magnetLink);
      }
    });

    this.setState({ selected: {} });
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
    const { torrents } = this.props;
    const { selected, sort, sortAscending } = this.state;
    const greyOut = Object.keys(selected).every(select => !selected[select]);

    return <div>
      <AppBar position='static' style={styles.toolbar}>
        <Toolbar>
          <IconButton style={{ color: greyOut ? grey['500'] : 'white' }}>
            <Pause/>
          </IconButton>
          <IconButton onClick={this.deleteTorrents} style={{ color: greyOut ? grey['500'] : red['500'] }}>
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
        <div>
          <Checkbox
            checked={false}
            onChange={this.selectAll}
            style={{ width: '2rem' }}
          />
        </div>
        <div style={{ ...styles.section, cursor: undefined }}>
          Name
        </div>
        <div onMouseDown={() => this.changeSort('size')} style={styles.section}>
          Size
          {sort === 'size' && (sortAscending
            ? <ExpandLess style={styles.expandIcon} />
            : <ExpandMore style={styles.expandIcon} />)
          }
        </div>
        <div onMouseDown={() => this.changeSort('added')} style={styles.section}>
          Added
          {sort === 'added' && (sortAscending
            ? <ExpandLess style={styles.expandIcon} />
            : <ExpandMore style={styles.expandIcon} />)
          }
        </div>
      </Paper>

      <List>
        {torrents
          .sort((a, b) => sortAscending ? a[sort] - b[sort] : b[sort] - a[sort])
          .map((torrent, i) => (
            <TorrentItem
              key={i}
              onPress={() => this.toggleSelected(torrent.magnetLink)}
              selected={!!selected[torrent.magnetLink]}
              style={styles.section}
              torrent={torrent}
            />
          ))
        }
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

export default connect(
  (state: ReducerState) => ({
    torrents: state.torrents,
  }),
  {
    deleteTorrent,
    getState,
  },
)(App);