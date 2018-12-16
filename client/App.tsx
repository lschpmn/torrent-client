import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import Pause from '@material-ui/icons/Pause';
import Settings from '@material-ui/icons/Settings';
import * as React from 'react';
import { connect } from 'react-redux';
import { Torrent } from '../types';
import SettingsModal from './components/SettingsModal';
import TorrentItem from './components/TorrentItem';
import { getState } from './lib/thunks';

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

type Props = {
  getState: typeof getState,
};

type State = {
  link: string,
  selected: { [i: number]: boolean },
  showDialog: boolean,
  showSettings: boolean,
};

export class App extends React.Component<Props, State> {
  state = {
    link: '',
    selected: {},
    showDialog: false,
    showSettings: false,
  };

  componentDidMount() {
    this.props.getState();
  }

  editLink = (e: any) => this.setState({ link: e.target.value });

  onSubmit = () => {
    this.toggleDialog();
    console.log(`Submitted ${this.state.link}`);
    this.setState({ link: '' });
  };

  toggleDialog = () => this.setState({ showDialog: !this.state.showDialog });

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

          <IconButton style={{ color: 'white' }} onMouseDown={this.toggleDialog}>
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
      <Dialog
        fullWidth
        onClose={this.toggleDialog}
        open={this.state.showDialog}
      >
        <DialogTitle>Add New Torrent</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Paste magnet link here
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Magnet Link"
            onChange={this.editLink}
            type="text"
            value={this.state.link}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.toggleDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={this.onSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
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
  state => ({}),
  {
    getState,
  }
)(App);