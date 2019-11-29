import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Add from '@material-ui/icons/Add';
import { useCallback, useState } from 'react';
import * as React from 'react';
import { addTorrent } from '../lib/action-creators';
import { useAction } from '../lib/utils';

const AddTorrentModal = () => {
  const [open, setOpen] = useState(false);
  const addTorrentAction = useAction(addTorrent);
  const [link, setLink] = useState('');
  const classes = useStyles({});

  const onSubmit = useCallback(() => {
    if (!link.length) return;
    setOpen(false);
    addTorrentAction(link);
    setLink('');
  }, [link]);

  return <div>
    <IconButton className={classes.white} onMouseDown={() => setOpen(true)}>
      <Add/>
    </IconButton>
    <Dialog
      fullWidth
      onClose={() => setOpen(false)}
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
        <Button onClick={() => setOpen(false)} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  </div>;
};

const useStyles = makeStyles(theme => ({
  white: {
    color: theme.palette.common.white,
  },
}));

export default AddTorrentModal;
