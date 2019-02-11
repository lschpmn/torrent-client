import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as React from 'react';
import { Torrent } from '../../types';

type Props = {
  onClose: () => void,
  onDelete: () => void,
  open: boolean,
  torrentsToDelete?: Torrent[],
};

const DeleteModal = ({ onClose, onDelete, open, torrentsToDelete }: Props) => {
  if (!torrentsToDelete) return null;

  return <Dialog
    fullWidth
    onClose={onClose}
    open={open}
  >
    <DialogTitle>
      <div style={styles.redText}>Delete</div>
    </DialogTitle>
    <DialogContent>
      {torrentsToDelete.map(torrent =>
        <DialogContentText key={torrent.magnetLink} style={styles.item}>
          {torrent.name}
        </DialogContentText>
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={onDelete} style={styles.redText}>Delete Torrent</Button>
      <Button onClick={onDelete} style={styles.redText}>Delete Torrent and Data</Button>
      <Button onClick={onClose}>Cancel</Button>
    </DialogActions>
  </Dialog>;
};

const styles = {
  redText: {
    color: red['500'],
  },
  item: {
    color: 'black',
    margin: '1rem 1rem 1rem 0',
  },
};

export default DeleteModal;