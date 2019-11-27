import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { useCallback, useState } from 'react';
import * as React from 'react';
import { addTorrent } from '../lib/action-creators';
import { useAction } from '../lib/utils';

type Props = {
  onClose: () => void,
  open: boolean,
};

const AddTorrentModal = ({ onClose, open }: Props) => {
  const addTorrentAction = useAction(addTorrent);
  const [link, setLink] = useState('');

  const onSubmit = useCallback(() => {
    if (!link.length) return;
    onClose();
    addTorrentAction(link);
    setLink('');
  }, [link, onClose]);

  return <Dialog
    fullWidth
    onClose={onClose}
    open={open}
  >
    <DialogTitle>Add New Torrent</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Paste magnet link here
      </DialogContentText>
      <TextField
        autoFocus
        color="secondary"
        margin="dense"
        id="name"
        label="Magnet Link"
        onChange={e => setLink(e.target.value)}
        type="text"
        value={link}
        fullWidth
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onSubmit} color="secondary">
        Add
      </Button>
      <Button onClick={onClose} color="secondary">
        Cancel
      </Button>
    </DialogActions>
  </Dialog>;
};

export default AddTorrentModal;
