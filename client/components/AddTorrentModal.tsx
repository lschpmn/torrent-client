import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import { connect } from 'react-redux';
import { addTorrent } from '../lib/thunks';

type Props = {
  addTorrent: typeof addTorrent,
  onClose: () => void,
  open: boolean,
};

type State = {
  link: string
};

export class AddTorrentModal extends React.Component<Props, State> {
  state = {
    link: '',
  };

  editLink = (e: any) => this.setState({ link: e.target.value });

  onSubmit = () => {
    this.props.onClose();
    this.props.addTorrent(this.state.link);
    this.setState({ link: '' });
  };

  render() {
    return <Dialog
      fullWidth
      onClose={this.props.onClose}
      open={this.props.open}
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
        <Button onClick={this.onSubmit} color="primary">
          Add
        </Button>
        <Button onClick={this.props.onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>;
  }
}

export default connect(
  state => ({}),
  {
    addTorrent,
  },
)(AddTorrentModal);