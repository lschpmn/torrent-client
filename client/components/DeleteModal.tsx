import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import T from '@material-ui/core/Typography';
import * as React from 'react';
import { useCallback } from 'react';
import { Torrent } from '../../types';
import { deleteTorrent } from '../lib/action-creators';
import { useAction } from '../lib/utils';

type Props = {
  onClose: () => void,
  open: boolean,
  torrents?: Torrent[],
};

const DeleteModal = ({ onClose, open, torrents }: Props) => {
  const deleteTorrentAction = useAction(deleteTorrent);

  const onDelete = useCallback(() => {
    torrents.forEach(torrent => deleteTorrentAction(torrent.magnetLink));
  }, [torrents]);

  if (!torrents) return null;
  return <Dialog
    fullWidth
    onClose={onClose}
    open={open}
  >
    <DialogTitle>
      Delete
    </DialogTitle>
    <DialogContent>
      {torrents.map(torrent =>
        <DialogContentText key={torrent.magnetLink} style={styles.item}>
          {torrent.name}
        </DialogContentText>
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={onDelete}><T color="error" variant="inherit">Delete Torrent</T></Button>
      <Button onClick={onDelete}><T color="error" variant="inherit">Delete Torrent and Data</T></Button>
      <Button onClick={onClose}>Cancel</Button>
    </DialogActions>
  </Dialog>;
};

const styles = {
  item: {
    color: 'black',
    margin: '1rem 1rem 1rem 0',
  },
};

export default DeleteModal;
